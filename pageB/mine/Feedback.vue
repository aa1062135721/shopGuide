<template>
	<view class="Feedback">
		<view class="content">
			<myTextarea :pl='place' :len='length' @contentVal='contentVal'></myTextarea>
			<view class="btn">
				<button @click="submit">提交</button>
			</view>
			<view>
				<u-toast ref="uToast" />
			</view>
		</view>
	</view>
</template>

<script>
	import myTextarea from '@/pageB/my-textarea/my-textarea.vue'
	export default {
		components: {
			myTextarea
		},
		
		data () {
			return {
				place: '请输入反馈信息',
				length: 300,
				feedbackVal: ''
			}
		},
		
		methods: {
			contentVal (val) {
				this.feedbackVal = val
			},
			
			submit () {
				let subItems = {
					feedbacks: this.feedbackVal,
					openId: uni.getStorageSync('openId')
				}
				this.Api.post('yjFeeback', subItems).then(res => {
					if (res.data.code) {
						this.$refs.uToast.show({
							title: '提交成功',
							type: 'success',
							position: 'top',
							back: true
						})
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.Feedback {
	height: 100vh;
	.content {
		height: 100%;
		padding: 0 26rpx;
		.btn {
			margin-top: 80rpx;
			button {
				background: #2FA1BE;
				color: #FFFFFF;
				height: 77rpx;
				font-size: 26rpx;
				line-height: 77rpx;
			}
		}
	}
}
</style>
