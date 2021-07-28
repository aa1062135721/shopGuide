<template>
	<view class="search">
		<view class="top">
			<u-search placeholder="请输入店铺名称/公共设施名称" action-text="取消" :animation="true" v-model="searchVal" @search="findNow" @custom="clearVal" @change="queryInfo"></u-search>
		</view>
		<view class="dataList">
			<view class="noContent" v-show="emptyFlag && !data.shops_db.length && !data.gg_se.length">
				<u-empty text="什么都没找到，换个关键词试试吧" :src="require('@/static/bg_noContent.png')" icon-size="600"></u-empty>
			</view>
			<view class="shop" v-if="data.shops_db">
				<view class="single" v-for="(item, index) in data.shops_db" :key="index">
					<view class="left">
						<image :src="baseUrl + item.picture_url" width="140" height="140"></image>
					</view>
					<view class="right">
						<text class="shopName">{{item.shop_name}}</text>
						<view class="discount" v-if="item.tagsArr && item.tagsArr.length">
							<u-tag v-for="(item1,index1) in item.tagsArr" :key="index1" :text="item1"
								type="success" bg-color="#FFFFFF" color="#2FA1BE" border-color="#2FA1BE"
								size="mini" shape="circle" />
						</view>
						<view class="address flexBox">
							<image src="@/static/icon_address.png" width="20" height="20" v-if="item.is_referrer === 1"></image>
							<text>{{item.shop_address}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="shop" v-if="data.gg_se">
				<view class="single rightSinle" v-for="(item, index) in data.gg_se" :key="index">
					<!-- <view class="left">
						<image :src="baseUrl + item.picture_url" width="140" height="140"></image>
					</view> -->
					<view class="right">
						<text class="shopName">{{item.fl_name}}</text>
						<!-- <view class="discount">
							<u-tag v-for="(item1,index1) in item.tagsArr" :key="index1" :text="item1"
								type="success" bg-color="#FFFFFF" color="#2FA1BE" border-color="#2FA1BE"
								size="mini" shape="circle" />
						</view> -->
						<view class="address flexBox">
							<image src="@/static/icon_address.png" width="20" height="20" v-if="item.is_referrer === 1"></image>
							<text>{{item.address}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				baseUrl: this.BaseUrl,
				searchVal: '',
				data: {},
				emptyFlag: false
			}
		},
		
		methods: {
			findNow (val) {
				if (!val) {
					this.$refs.uToast.show({
						type: 'warning ',
						title: '请输入关键词',
						position: 'top'
					})
					return
				}
				let subItems = {
					names: val
				}
				this.Api.get('searchAll', subItems).then(res => {
					if (res.data.code) {
						this.data = res.data.data
						this.data.shops_db.map(res => {
							if (res.tags_name) this.$set(res, 'tagsArr', res.tags_name.split(','))
						})
						this.emptyFlag = true
					}
				})
			},
			
			queryInfo () {
				if (!this.searchVal) {
					this.clearVal()
					return
				}
			},
			
			clearVal () {
				this.searchVal = ''
				this.emptyFlag = false
				this.data = {}
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
.search {
	height: 100vh;
	.top {
		padding: 0 32rpx;
		background-color: #FFFFFF;
		height: 100rpx;
	}
	.dataList {
		height: 100%;
		background-color: #F5F5F5;
		padding-top: 32rpx;
		.noContent {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		.shop {
			display: flex;
			flex-direction: column;
			align-items: center;
			.single {
				width: 94%;
				padding: 16rpx;
				margin-bottom: 32rpx;
				background-color: #FFFFFF;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				.left {
					margin-right: 16rpx;
					border: 2rpx solid #f9f9f9;
					image {
						width: 150rpx;
						height: 150rpx;
					}
				}
				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 6rpx 0;
					.shopName {
						color: #000000;
						font-size: 36rpx;
						margin-bottom: 20rpx;
						font-weight: bold;
					}
					.discount {
						margin-bottom: 20rpx;
						u-tag {
							margin-right: 8rpx;
						}
					}
					.address {
						font-size: 24rpx;
						color: #999999;
						display: flex;
						align-items: center;
						image {
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
			}
			.rightSinle {
				padding: 40rpx 20rpx;
			}
		}
	}
}
</style>
