<template>
	<view class="guide">
		<view class="floorPlan" v-if="floorUrl">
			<image :src="baseUrl + floorUrl" mode="aspectFit" :lazy-load="true" @click="TanPreviewImage"></image>
		</view>
		<view class="floorPlan centerFlex" v-else>
			暂无图片
		</view>
		<view class="switchFloor" @click="isShowFloor = true">
			<text>{{loudongList[idx].loud_name}}</text>
			<image src="@/static/icon_moreFloor.png"></image>
		</view>
		<view class="switchRegion" v-if="cacheList && cacheList.length">
			<view class="single" v-for="(item, index) in cacheList" :key="index" @click="chooseRegion(index)" :class="current === index ? 'single-activation' : ''">
				<text>{{item.floor_name}}</text>
			</view>
		</view>
		<view class="noCentent" v-else style="margin-top: 0rpx;">
			<text>暂无楼层</text>
		</view>
		<view class="chooseFloor">
			<u-popup v-model="isShowFloor" mode="bottom" border-radius="20" height="70%"  class="popup">
				<view class="top">
					<text>选择楼栋</text>
					<image src="@/static/icon_close.png" @click="isShowFloor = false"></image>
				</view>
				<view style="height: 106rpx;"></view>
				<view v-for="(item, index) in loudongList" :key="index" class="single" @click="chooseFloor(index)">{{item.loud_name}}</view>
				<view style="height: 1rem;"></view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				baseUrl: this.BaseUrl,
				current: 0,
				isShowFloor: false,
				floorList: [], // 获取全部楼层信息
				idx: 0, // 楼栋索引
				loudId: '',
				loudongList: [], // 获取全部楼栋信息
				floorUrl: '', // 当前楼层图
				cacheList: [] // 缓存当前楼栋信息
			}
		},
		
		created () {
			this.fetchData()
			this.getlouDong()
		},
		
		methods: {
			// 获取全部楼层信息
			fetchData () {
				this.Api.get('getFllor').then(res => {
					if (res.data.code) {
						this.floorList = res.data.data
						this.floorUrl = res.data.data[0].floor_url
						setTimeout(() => { this.chooseRegion() }, 30)
						setTimeout(() => { this.chooseRegion() }, 300)
						setTimeout(() => { this.chooseRegion() }, 500)
					}
				})
			},
			
			// 获取楼栋数据
			getlouDong () {
				this.Api.get('getLodun').then(res => {
					if(res.data.data && res.data.data.length) {
						this.loudongList = res.data.data
						this.loudId = res.data.data[0].id
					}
				})
			},
			
			// 获取当前楼栋的楼层信息
			chooseRegion (idx) {
				this.current = 0 // 初始化楼层索引
				if (typeof idx === "number") this.current = idx
				
				let subItem = {
					floor_id: this.floorList[this.current].id,
					loud_id: this.loudId
				}
				
				this.Api.get('dlList', subItem).then(res => {
					if (res.data.code) {
						if (res.data.data && res.data.data.length) {
							this.floorUrl = res.data.data[this.current].floor_url
							this.cacheList = res.data.data
						} else {
							this.floorUrl = ''
							this.cacheList = []
						}
					}
				})
			},
			
			// 选择楼栋
			chooseFloor (idx) {
				this.idx = idx
				if (this.loudongList && this.loudongList.length) this.loudId = this.loudongList[idx].id
				this.chooseRegion()
				this.isShowFloor = false
			},
			
			//  预览图片
			TanPreviewImage () {
				var images = [];
				let src = this.baseUrl + this.floorUrl
				images.push(src)
				uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
					current:0,
					urls:images,
					longPressActions: {  //长按保存图片到相册
						itemList: ['保存图片'],
						success: (data)=> {
							console.log(data);
							uni.saveImageToPhotosAlbum({ //保存图片到相册
								filePath: payUrl,
								success: function () {
									uni.showToast({icon:'success',title:'保存成功'})
								},
								fail: (err) => {
									uni.showToast({icon:'none',title:'保存失败，请重新尝试'})
								}
							});
						},
						fail: (err)=> {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.guide {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.floorPlan {
		height: 78vh;
		text-align: center;
		image {
			width: 80%;
			height: 100%;
		}
	}
	.switchFloor {
		font-size: 36rpx;
		color: #2FA1BE;
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			width: 21rpx;
			height: 12rpx;
			margin-left: 15rpx;
		}
	}
	.switchRegion {
		width: 80%;
		margin: 0 auto;
		margin-top: 40rpx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		flex: 1;
		.single {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			background: #F5F5F5;
			text-align: center;
			line-height: 120rpx;
			font-size: 48rpx;
			margin: 0 12rpx 12rpx 0;
		}
		.single-activation {
			background: #2FA1BE;
			color: #FFFFFF;
		}
	}
	.chooseFloor {
		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 32rpx 32rpx 0 32rpx;
			font-size: 36rpx;
			font-weight: bold;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			margin-bottom: 41rpx;
			image {
				width: 24rpx;
				height: 24rpx;
			}
		}
		.single {
			padding: 33rpx 0;
			text-align: center;
			background: #F5F5F5;
			margin: 22rpx 30rpx;
			border-radius: 10rpx;
			color: #666666;
			font-size: 36rpx;
		}
	}
	.centerFlex {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 48rpx;
	}
}
</style>
