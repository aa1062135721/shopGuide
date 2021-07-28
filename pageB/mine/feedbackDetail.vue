<template>
	<view class="feedbackDetail">
		<view class="feedback">
			<view class="time">
				<text>{{dayjs.unix(data.create_time).format('YYYY-MM-DD HH:mm')}}</text>
			</view>
			<view class="content">
				<text class="title">反馈意见：</text>
				<text>{{data.feedbacks}}</text>
			</view>
		</view>
		<view class="replyContent" v-if="data.reply_content">
			<view class="time">
				<text>{{dayjs.unix(data.talk_time).format('YYYY-MM-DD HH:mm')}}</text>
			</view>
			<view class="content">
				<text class="title">回复内容：</text>
				<text>{{data.reply_content}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				data: {}
			}
		},
		
		onLoad (option) {
			this.data = JSON.parse(option.params)
			console.log(this.data)
		}
	}
</script>

<style lang="scss" scoped>
.feedbackDetail {
	height: 100vh;
	background: #F5F5F5;
	padding-top: 32rpx;
	.feedback, .replyContent {
		display: flex;
		flex-direction: column;
		.time {
			text-align: center;
			color: #999999;
			font-size: 29rpx;
			margin-bottom: 32rpx;
		}
		.content{
			align-self: flex-end;
			width: 80%;
			background: #2FA1BE;
			display: flex;
			flex-direction: column;
			padding: 16rpx 19rpx;
			color: #FFFFFF;
			margin-right: 32rpx;
			border-radius: 6rpx;
			line-height: 51rpx;
			position: relative;
			font-size: 29rpx;
			&::before {
				content: '';
				display: block;
				position: absolute;
				top: 16rpx;
				right: -10rpx;
				width: 0;
				height: 0;
				border-top:19rpx solid transparent;
				border-left: 19rpx solid #2FA1BE;
				border-bottom: 19rpx solid transparent;
			}
		}
	}
	.replyContent {
		margin-top: 32rpx;
		.content {
			align-self: flex-start;
			margin-left: 32rpx;
			background: #FFFFFF;
			color: #333333;
			&::before {
				content: '';
				display: block;
				position: absolute;
				top: 16rpx;
				left: -10rpx;
				width: 0;
				height: 0;
				border-top: 19rpx solid transparent;
				border-right: 19rpx solid #FFFFFF;
				border-bottom: 19rpx solid transparent;
				border-left: none;
			}
		}
	}
}
</style>
