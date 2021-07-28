<template>
	<view class="aboutUs">
		<view class="title">
			<text>一、会员等级说明</text>
		</view>
		<view class="section section1">
			<text class="head">1.什么是"会员等级"方案？</text>
			<text>这是为会员打造定制的一套回馈、增值奖励方案，会员级别越高享受的权益越多，更多的权益策略将在不断完善中，敬请期待。</text>
		</view>
		<view class="section">
			<text class="head">2.会员等级规则</text>
			<text>1) 升级成功后，会员级别会永久保留吗？</text>
			<text>会员的有效期是自升级后一年，级别过期后，我们会根据您过去一年的成长值，重新调整您的会员级别。</text>
			<text>2) 会员级别的有效期限能延长吗？</text>
			<text>当会员级别到期后，如未能达到升级标准，但凡会员到期前12个月消费金额大于0元，则当前会员级别就可以顺延一年。</text>
			<text>3) 我是钻石会员，会员级别到期后没达到延长升级条件，会如何降级？</text>
		</view>
		<view class="section">
			<text>会员级别到期后，如果未能达到升级及延长有效期条件，将顺次下调一个会员级别 (但最低只降到一星会员)，同时按照下调日更新会员级别有效期。</text>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.aboutUs {
		padding: 32rpx 26rpx;
		font-family: PingFang-SC-Medium;
		.title {
			font-size: 48rpx;
			margin-bottom: 48rpx;
		}
		.section {
			display: flex;
			flex-direction: column;
			line-height: 58rpx;
			font-size: 32rpx;
			margin-bottom: 64rpx;
		}
	}
</style>
