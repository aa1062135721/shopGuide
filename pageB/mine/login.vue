<template>
	<view class="login">
		<view class="title">
			<text>丝路花街</text>
		</view>
		<view class="tips">
			<text>申请获取以下权限</text>
		</view>
		<view class="text">
			<text>获取你的公开信息(昵称、头像等)</text>
		</view>
		<view class="btn">
			<button class="bt1" @click="getInfo">授权登录</button>
			<button class="bt2" @click="goBack">取消</button>
		</view>
		<!-- <view class="btn">
			<button class="bt1" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">微信快捷登录</button>
		</view> -->
	</view>
</template>

<script>
	import { common } from "@/utils/common.js"
	import WXBizDataCrypt from "@/utils/WXBizDataCrypt.js";
	export default {
		data () {
			return {
				code: '',
				openid: '',
				session_key: '',
				unionid: '',
				telNumber: ''
			}
		},
		
		onLoad () {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					if (res.code) {
						this.code = res.code
						this.Api.get('LoginsGetOpendId', {code: res.code}).then(res => {
							if (res.data.code) {
								this.openid = res.data.data.openid
								uni.setStorageSync('openId', res.data.data.openid)								
							}
						})
						// uni.request({
						// 	url: 'https://api.weixin.qq.com/sns/jscode2session',
						// 	method: "GET",
						// 	data: {
						// 		appid: common.AppId,
						// 		secret: common.AppSecret,
						// 		js_code: res.code
						// 	},
						// 	success: (res1) => {
						// 		uni.showToast({
						// 			title: '11111',
						// 			icon: 'none'
						// 		})
						// 		this.openid = res1.data.openid
						// 		this.session_key = res1.data.session_key
						// 		this.unionid = res1.data.unionid
						// 		uni.setStorageSync('openId', res1.data.openid)
						// 	},
						// })
					}
				}
			})
		},
		
		methods: {
			// 获取用户信息
			getInfo () {
				uni.getUserProfile({
					lang:'zh_CN',
					desc:'登录',
					success:(res)=>{
						uni.setStorageSync('userInfo', res.userInfo)
						uni.redirectTo({
							url: '/pageB/mine/index'
						})
						let subItems = {
							openId: this.openid,
							nickName: res.userInfo.nickName,
							headImage: res.userInfo.avatarUrl
						}
						this.Api.post('LoginsUserLogin', subItems).then(res => {
							if (res.data.code !== 200) {
								uni.showToast({
									title: res.data.msg
								})
							}
						})
					},
					fail:(res)=>{
						console.log(res)
					}
				})
			},
			
			goBack () {
				uni.redirectTo({
					url: '/pageB/mine/index'
				})
			},
			
			// 获取手机号
			decryptPhoneNumber (e) {
				if (e.detail.errMsg === "getPhoneNumber:fail user deny") { //用户拒绝授权
					uni.showToast({
						title: "拒绝授权会导致部分功能不可用",
						icon: 'none'
					})
				} else {
					let pc = new WXBizDataCrypt(common.AppId,this.session_key)
					let data = pc.decryptData(e.detail.encryptedData , e.detail.iv)
					this.telNumber = data.phoneNumber
					console.log(this.telNumber)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30vh;
		.title {
			font-size: 48rpx;
			font-weight: bold;
			color: #333333;
		}
		.tips {
			margin-top: 60rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
		}
		.text {
			margin-top: 40rpx;
			color: #333333;
		}
		.btn {
			width: 80%;
			margin-top: 80rpx;
			color: #FFFFFF;
			height: 77rpx;
			font-size: 26rpx;
			line-height: 77rpx;
			.bt1 {
				margin-top: 20rpx;
				background: #2FA1BE;
				color: #fff;
			}
			.bt2 {
				margin-top: 20rpx;
				background-color: #fff;
			}
		}
	}
</style>
