<template>
	<view class="shop">
		<view class="top">
			<u-search placeholder="请输入店铺名称" v-model="searchVal" @search="findNow" :show-action="false"
				@change="changSearchVal">
			</u-search>
			<vgt-tab :list="shopTypeList" :isUseOpenList="false" @onValueChange="getCurrent"
				:defaultChoseInd="tabsIndex"></vgt-tab>
		</view>
		<view class="content" v-if="shopDetailList && shopDetailList.length">
			<u-swiper :cardData="cardData" :current="swiperIndex" :list="imgVideoArr" name="imgs" :autoplay="false"
				mode="none" :effect3d="true" :height="swiperHeight" effect3d-previous-margin="70" @change="changeSwiper"
				@click="swiperDetail" img-mode="widthFix"></u-swiper>
			<swiper :current="current" :circular='true' duration="200" @change="switchCard">
				<swiper-item v-for="(item, index) in shopDetailList" :key="index">
					<view class="footer">
						<view class="box">
							<view class="title flexBox">
								<view class="left flexBox">
									<text>{{item.shop_name}}</text>
									<image src="@/static/icon_tuijian.png" v-if="item.is_referrer"></image>
								</view>
								<view class="right" v-if="item.tagsArr && item.tagsArr.length">
									<u-tag v-for="(item1,index1) in item.tagsArr" :key="index1" :text="item1"
										type="success" bg-color="#FFFFFF" color="#2FA1BE" border-color="#2FA1BE"
										size="mini" shape="circle" />
								</view>
							</view>
							<view class="address">
								<image src="@/static/icon_address.png"></image>
								<text>{{item.shop_address}}</text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="noCentent" v-else>
			<text>暂无</text>
		</view>
	</view>
</template>

<script>
import vgtTab from '@/pageA/vgt-tab/vgt-tab.vue'
export default {
	components: {
		vgtTab
	},

	data() {
		return {
			baseUrl: this.BaseUrl, // 默认地址
			searchVal: '', // 搜索值
			tabsIndex: 0, // 菜单栏默认选中
			swiperHeight: 800, // 图片高度
			swiperIndex: 0, // 默认第一张图片
			current: 0, // 默认显示第一个店铺
			shopTypeList: [], // 菜单数据
			shopDetailList: [], // 店铺详情
			countDownFlag: true, // 判断是否只保存一次数据
			allLen: 0 ,//全部数据长度,
			imgVideoArr: []
		}
	},

	onLoad() {
		// 设置图片高度
		uni.getSystemInfo({
			success: (res) => {
				this.swiperHeight = (res.windowHeight - 130) * 2
			}
		});
	},

	created() {
		this.getShopType()
		this.getShopDetail()
		setTimeout(() => {
			this.countDownFlag = false
		}, 2000)
	},

	methods: {
		//  搜索店铺
		findNow(val) {
			console.log(this.tabsIndex)
			this.getShopDetail(val, 1)
		},

		// 切换菜单栏
		getCurrent(index) {
			this.swiperIndex = 0
			this.tabsIndex = index.currentInd
			this.getShopDetail(index.currentInd, 2)
		},

		// 切换轮播
		changeSwiper(index) {
			this.swiperIndex = index
		},

		// 切换card
		switchCard(e) {
			this.swiperIndex = 0
			this.current = e.detail.current
			let id = this.shopDetailList[this.current].merchat_id
			this.imgVideoArr = []
			this.getVideoImgSrc(id)
		},
		
		// 获取图片视频资源
		getVideoImgSrc (ids) {
			uni.request({
				url: 'https://shopmange.mx5918.com/index.php/admin/index/getStoreContent',
				method: "GET",
				data: {
					shopId: typeof ids === 'number' ? ids : this.shopDetailList[0].merchat_id
				},
				success: (res) => {
					this.imgVideoArr = res.data.data
					if (!this.imgVideoArr.length) return
					this.imgVideoArr.map(res => {
						this.$set(res, 'imgs', 'http://shopmange.mx5918.com/' + res.url)
					})
				},
				fail(err) {
					uni.showToast({
						title: err
					})
				}
			})
		},

		// 获取菜单数据
		getShopType(val) {
			let subItems = {
				names: '',
				type: 1
			}
			if (val) subItems.names = val
			this.Api.get('getShopfl', subItems).then(res => {
				if (res.data.code) {
					this.shopTypeList = res.data.data
					this.shopTypeList.unshift({
						id: '',
						sp_name: '全部'
					})
				}
			})
		},

		// 清空内容，重新请求
		changSearchVal(val) {
			if (!val) {
				this.getShopDetail()
				this.tabsIndex = ''
			}
		},

		// 获取店铺信息
		getShopDetail(name, type) {
			let subItems = {
				names: '',
				type: 1
			}
			if (name) subItems.names = name
			if (type) subItems.type = type
			this.Api.get('shopDp', subItems).then(res => {
				if (res.data.code) {
					if (this.countDownFlag) {
						this.allLen = res.data.data.length
					}
					if (type) this.current = 0
					this.shopDetailList = res.data.data
					this.shopDetailList.map(res => {
						if (res.tags_name) this.$set(res, 'tagsArr', res.tags_name.split(','))
						if (res.picture_url) this.$set(res, 'picUrl', (this.baseUrl + res.picture_url))
					})

					this.getVideoImgSrc()
					
					// 搜索
					if (type === 1 && name) {
						if (this.allLen === this.shopDetailList.length) {
							this.tabsIndex = ''
						} else {
							let d = null
							if (this.shopDetailList && this.shopDetailList.length === 1) {
								d = this.shopTypeList.filter(res => res.sp_name === this.shopDetailList[0].sp_name)
								console.log(this.shopDetailList)
								this.tabsIndex = d[0].id
							} else {
								this.tabsIndex = ''
							}
						}
						this.$forceUpdate()
					}
				}
			})
		},

		swiperDetail(idx) {
			// uni.navigateTo({
			// 	url: `/pageA/shop/detail?params=${JSON.stringify(this.shopDetailList[idx])}`
			// })
		}

	}
}
</script>

<style lang="scss" scoped>
.shop {
	height: 100vh;
	display: flex;
	flex-direction: column;

	.content {
		flex: 1;
		background-color: #F5F5F5;
		padding-top: 40rpx;
		display: flex;
		flex-direction: column;
		position: relative;

		u-swiper {
			flex: 1;
		}

		swiper {
			width: 100%;
			height: 220rpx;
			position: absolute;
			bottom: 0;
			z-index: 99;
		}

		.footer {
			height: 220rpx;
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 26rpx 26rpx 0 0;

			.box {
				height: 100%;
			}

			.title {
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 30rpx 10rpx 30rpx;

				.left {
					font-size: 48rpx;
					font-weight: bold;
					align-items: center;

					image {
						width: 48rpx;
						height: 48rpx;
					}
				}

				.right {
					/deep/.u-tag {
						font-size: 24rpx;
						margin-right: 6rpx;
						margin-bottom: 6rpx;
					}
				}
			}

			.address {
				display: flex;
				align-items: center;
				padding: 13rpx 27rpx;
				color: #999999;
				font-size: 28rpx;
				margin-top: 12rpx;

				image {
					width: 28rpx;
					height: 28rpx;
				}
			}
		}
	}
}
</style>
