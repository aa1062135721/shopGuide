<template>
	<view class="mine u-skeleton">
		<view class="top">
			<view class="bg u-skeleton-rect">
				<image src="https://cuntabusines.mx5918.com/images/bg_mine.png" @load="load"></image>
			</view>
			<view class="navBar" :style="{marginTop: bangsHeight + 'px'}">
				<view class="left" @click="goBack">
					<image src="../../static/icon_left_arrow.png"></image>
				</view>
			</view>
			<view class="userInfo" v-if="userInfo.avatarUrl && userInfo.nickName">
				<image :src="userInfo.avatarUrl" class="u-skeleton-circle"></image>
				<text class="user-name">{{userInfo.nickName}}</text>				
			</view>
			<view class="userInfo" v-else>
				<image class="u-skeleton-circle" src="../../static/header.png"></image>
				<text class="user-name" @click="login">未登录</text>
			</view>
		</view>
		<view class="content">
			<u-cell-group>
				<u-cell-item class="u-skeleton-rect" :icon="aboutMine" title="关于我们" @click="goPage('/pageB/mine/aboutUs', 1)"></u-cell-item>
				<u-cell-item class="u-skeleton-rect" :icon="feedBack" title="意见反馈" @click="goPage('/pageB/mine/Feedback', 2)"></u-cell-item>
				<u-cell-item class="u-skeleton-rect" :icon="myFeedBack" title="我的反馈" @click="goPage('/pageB/mine/myFeedback', 2)"></u-cell-item>
			</u-cell-group>
		</view>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	import aboutMine from '@/static/icon_aboutMine.png'
	import feedBack from '@/static/icon_feedBack.png'
	import myFeedBack from '@/static/icon_myFeedBack.png'
	export default {
		data () {
			return {
				aboutMine,
				feedBack,
				myFeedBack,
				bangsHeight: '',
				userInfo: uni.getStorageSync('userInfo'),
				loading: true
			}
		},
		
		onShow () {
			uni.getSystemInfo({
			    success: (e) => {
					let customBar = 0
					// #ifdef MP-WEIXIN
					const custom = wx.getMenuButtonBoundingClientRect()
					customBar = custom.top
					// #endif
					this.bangsHeight = customBar
			    }
			})
		},
		
		methods: {
			goPage (url, type) {
				if (type === 2) {
					if (uni.getStorageSync('userInfo')) {
						uni.navigateTo({
							url: url
						})		
					} else {
						uni.showToast({
							title: "请先登录",
							icon: 'none'
						})
					}
				} else {
					uni.navigateTo({
						url: url
					})					
				}
			},
			
			goBack () {
				uni.navigateBack()
			},
			
			load () {
				this.loading = false
			},
			
			login () {
				uni.redirectTo({
					url: `/pageB/mine/login`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mine {
	height: 100vh;
	background: #F5F5F5;
	.top {
		height: 40%;
		background-size: 100% 100%;
		position: relative;
		z-index: 999;
		.bg {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.navBar {
			width: 100%;
			position: absolute;
			top: 0;
			display: flex;
			.left {
				cursor: pointer;
				width: 10vw;
				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
		.userInfo {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			image {
				width: 192rpx;
				height: 192rpx;
				border-radius: 50%;
				border: 10rpx solid #78acb1;
			}
			.user-name {
				font-size: 48rpx;
				margin-top: 32rpx;
				color: #FFFFFF;
			}
		}
	}
	.content {
		.u-cell {
			line-height: 48rpx;
		}
		/deep/.u-cell_title {
			font-size: 32rpx
		}
		/deep/.u-icon__img {
			width: 48rpx !important;
			height: 48rpx !important;
		}
		/deep/.u-icon__icon {
			font-size: 26rpx !important;
		}
	}
}
</style>
