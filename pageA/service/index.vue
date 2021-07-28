<template>
	<view class="service">
		<view class="top">
			<u-tabs :list="list" :is-scroll="true" name="fl_name" :current="current" @change="changeTab" bar-width="100" active-color="#2FA1BE" :bold="false"></u-tabs>
		</view>
		<view class="content" v-if="flDetailList.length">
			<view class="single" v-for="(item, index) in flDetailList" :key="index">
				<view class="left">
					<image :src="baseUrl + item.fw_picture" mode="aspectFit"></image>
				</view>
				<view class="right">
					<text class="title">{{item.fl_name}}</text>
					<view class="address">
						<image src="@/static/icon_address.png"></image>
						<text>{{item.address}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else style="text-align: center; margin-top: 60rpx; font-size: 32rpx;">
			<text>暂无</text>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				baseUrl: this.BaseUrl,
				list: [],
				current: 0,
				flDetailList: []
			}
		},
		
		created () {
			this.fetchData()
		},
		
		methods: {
			changeTab (idx) {
				this.current = idx
				this.getfwList(this.list[idx].id)
			},
			
			fetchData () {
				let subItems = {
					fw_fl_id: ''
				}
				this.Api.get('fwflList', subItems).then(res => {
					if (res.data.code) {
						this.list = res.data.data
						this.getfwList(res.data.data[0].id)
					}
				})
			},
			
			getfwList (id) {
				let subItems = {
					fw_fl_id: id
				}
				this.Api.get('fwList',subItems).then(res => {
					if (res.data.code) {
						this.flDetailList = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.service {
	min-height: 100vh;
	background: #F5F5F5;
	padding-bottom: 24rpx;
	.top {
		/deep/ .u-tab-item {
			height: 64rpx !important;
			line-height: 64rpx !important;
			font-size: 32rpx !important;
		}
		/deep/ .u-tab-bar {
			bottom: -6rpx;
			height: 4rpx;
		}
	}
	.content {
		.single {
			width: 90%;
			margin: 0 auto;
			display: flex;
			background: #FFFFFF;
			margin-top: 32rpx;
			padding: 16rpx;
			border-radius: 16rpx;
			.left {
				margin-right: 16rpx;
				image {
					width: 144rpx;
					height: 144rpx;
					border: 2rpx solid #f1f1f1;
					box-shadow: 0rpx 0rpx 4rpx 2rpx #f1f1f1;
				}
			}
			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 6rpx 0;
				.title {
					font-size: 32rpx;
					font-weight: bold;
				}
				.address {
					display: flex;
					align-items: center;
					font-size: 32rpx;
					color: #999999;
					image {
						width: 25.6rpx;
						height: 25.6rpx;
						margin-right: 3rpx;
					}
				}
			}
		}
	}
}
</style>
