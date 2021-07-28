<template>
	<view class="myFeedback" v-if="data && data.length">
		<view class="single" @click="goDatail(item)" v-for="(item, index) in data" :key="index">
			<view class="top">
				<view class="left">
					<text>{{dayjs.unix(item.create_time).format('YYYY-MM-DD HH:mm')}}</text>
				</view>
				<view class="right">
					<text v-if="item.reply_content">已回复</text>
					<text v-else style="color: #2FA1BE;">未回复</text>
				</view>
			</view>
			<u-line color="#EEEEEE" />
			<view class="detail">
				<text>{{item.feedbacks}}</text>
			</view>
		</view>
	</view>
	<view class="noCentent" v-else>
		<text>快去提意见吧</text>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				num: 1,
				data: []
			}
		},
		
		created () {
			this.fetchData()
		},
		
		methods: {
			goDatail (val) {
				uni.navigateTo({
					url:`/pageB/mine/feedbackDetail?params=${JSON.stringify(val)}`
				})
			},
			
			fetchData (id) {
				let subItem = {
					id: '',
					openId: uni.getStorageSync('openId')
				}
				if (id) subItem.id = id
				this.Api.get('feebackList', subItem).then(res => {
					if (res.data.code) {
						this.data = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.myFeedback {
	min-height: 100vh;
	background: #F5F5F5;
	padding-top: 32rpx;
	padding-bottom: 24rpx;
	.single {
		margin: 0 auto;
		width: 95%;
		background: #FFFFFF;
		padding: 26rpx 16rpx;
		border-radius: 10rpx;
		margin-bottom: 32rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 26rpx;
			font-size: 32rpx;
			.left {
				color: #333333;
				font-weight: bold;
			}
			.right {
				color: #999999;
			}
		}
		.u-line {
			border-bottom: 29rpx solid rgb(238, 238, 238)!important;
		}
		.detail {
			padding-top: 26rpx;
			line-height: 48rpx;
			font-size: 29rpx;
		}
	}
}
</style>
