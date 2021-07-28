<template>
	<view class="r-top">
		<textarea :maxlength="len" placeholder-style="color:rgba(153,153,153,1);" v-model="content" :placeholder="pl" @input="getVal"/>
		<view class="r-top-t">
		 	<view></view>
			<view> {{contentLength}}/{{len}}</view>
		 </view>
	</view>
</template>

<script>
	export default {
		computed:{
			contentLength(){
				return this.content.length;
			}
		},
		
		props:{
			pl:{
				type: String,
				default: "请输入"
			},
			
			len:{
				type: Number,
				default: 200
			}
		},
		
		data() {
			return {
				content:''
			}
		},
		
		methods: {
			getVal () {
				this.$emit('contentVal', this.content)
			}
		}
	}
</script>

<style lang="scss" scoped>
.r-top{
	padding: 26rpx;
	background: #F5F5F5;
	border-radius: 10rpx;
	height: 30%;
	/deep/ uni-textarea {
		width: 100%;
		padding: 32rpx 16rpx;
		box-sizing: border-box;
		height: 88%;
	}
	/deep/.uni-textarea-textarea {
		font-size: 32rpx;
	}
	/deep/ .textarea-placeholder {
		font-size: 32rpx;
	}
}
.r-top-t{
	display: flex;
	justify-content: space-between;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(153,153,153,1);
	opacity:1;
	font-size: 32rpx;
	margin: 0 16rpx 6rpx 0;
}
</style>
