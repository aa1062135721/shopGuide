<template>
	<page-meta root-foot-size="40px"></page-meta>
	<view class="home">
		<view class="content">
			<view class="top" :style="{paddingTop: bangs + 'px'}">
				<view class="left" @click="goPage('/pageA/search/index')">
					<image src="@/static/icon_search.png"></image>
				</view>
				<view class="center">
					<text>丝路花街</text>
				</view>
				<view class="right"></view>
			</view>
			<swiper :vertical="true" @change="changeSwiper" :current="currentIndex">
				<swiper-item v-for="(item, index) in picVideoList.imgs" :key="index" item-id="image">
					<scroll-view 
					style="height: 100%;"
					:refresher-triggered="resherFlag" 
					@refresherrefresh="refresherrefresh" 
					:refresher-enabled="index === 0">
						<image :src="baseUrl + item.picture_url" :lazy-load="true" mode="aspectFill"></image>
					</scroll-view>
				</swiper-item>
				<swiper-item class="video" v-for="(item, index) in picVideoList.video" :key="index" :item-id="`video${item.id}`">
					<video object-fit="contain" :id="`video${item.id}`" :src="baseUrl + item.video_url"  :loop="true" :enable-play-gesture="true"></video>
				</swiper-item>
			</swiper>
		</view>
		<view class="xlmore" v-if="slideFlag">
			<image src="../../static/more.png"></image>
		</view>
		<view class="tabBar">
			<view class="single" @click="goPage('/pageA/shop/index')">
				<image src="@/static/icon_shop.png"></image>
				<text>店铺</text>
			</view>
			<view class="single" @click="goPage('/pageA/guide/index')">
				<image src="@/static/icon_guide.png"></image>
				<text>导览</text>
			</view>
			<view class="single" @click="goPage('/pageA/service/index')">
				<image src="@/static/icon_service.png"></image>
				<text>服务</text>
			</view>
			<view class="single" @click="goPage('/pageB/mine/index')">
				<image src="@/static/icon_mine.png"></image>
				<text>我的</text> 
			</view>
		</view>
	</view>
</template>

<script>
	import {common} from '@/utils/common.js'
	export default {
		data() {
			return {
				baseUrl: this.BaseUrl,
				bangs: '',
				picVideoList: {},
				itemId: '',
				autoplayFlag: false,
				resherFlag: false,
				slideFlag: true,
				currentIndex: 0
			}
		},
		
		watch: {			
			resherFlag: function (newVal) {
				setTimeout(() => {
					this.resherFlag = false;
				}, 1000)
			}
		},
		
		created () {
			this.fetchData()
		},
		
		mounted () {
			setTimeout(() => {
				if (!this.picVideoList.imgs.length && this.picVideoList.video.length) {
					uni.createVideoContext(`video${this.picVideoList.video[this.currentIndex].id}`).play()
				}				
			}, 1000)
		},
		
		onShow () {
			// 获取顶部距离屏幕高度
			uni.getSystemInfo({
			    success: (e) => {
			      let customBar = 0		      
			      // #ifdef MP-WEIXIN
			      const custom = wx.getMenuButtonBoundingClientRect()
			      customBar = custom.top
			      // #endif

					this.bangs = customBar
			    }
			})
			
		},
		
		methods: {
			// 跳转
			goPage (url) {
				uni.navigateTo({
					url: url
				})
			},
			
			// 初始化数据
			fetchData () {
				this.Api.get('homes').then(res => {
					if (res.data.code) {
						this.picVideoList = res.data.data
					}
				})
			},
			
			// 页面滚动到当前视频，当前视频播放，其他视频暂停
			changeSwiper (e) {
				e.detail.current === 0 ? this.slideFlag = true : this.slideFlag = false
				if (e.target.currentItemId.includes('video')) {
					let id = e.target.currentItemId.substring(5)
					this.videoContext = uni.createVideoContext(`video${id}`, this)
					this.picVideoList.video.map(res => {
						if (res.id == id) {
							this.videoContext.play()
						} else {
							uni.createVideoContext(`video${res.id}`, this).pause()
							uni.createVideoContext(`video${res.id}`, this).seek(0)								
						}
					})
				} else {
					this.picVideoList.video.map(res => {
						uni.createVideoContext(`video${res.id}`, this).pause()
						uni.createVideoContext(`video${res.id}`, this).seek(0)
					})
				}
			},
			
			// 下拉刷新
			refresherrefresh () {
				this.fetchData()
				this.resherFlag = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
.home {
	height: 100vh;
	position: relative;
	.content {
		height: 100%;
		swiper {
			width: 100%;
			height: 100%;
		}
		image {
			width: 100%;
			height: 100%;
		}
		.video {
			// display: flex;
			// align-items: center;
			// justify-content: center;
			// background-color: #000;
		}
		video {
			width: 100%;
			height: 100%;
		}
		.top {
			width: 100%;
			padding: 30rpx;
			position: absolute;
			z-index: 9;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #FFFFFF;
			font-size: 36rpx;
			.left {
				image {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}
	}
	.xlmore {
		position: absolute;
		bottom: 60rpx;
		left: 45%;
		animation: move 1s infinite;
		animation-direction: alternate-reverse;
		image {
			width: 80rpx;
			height: 80rpx;
		}
	}
	.tabBar {
		position: absolute;
		right: 20rpx;
		bottom: 120rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		.single {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 35rpx;
			image {
				width: 120rpx;
				height: 120rpx;
			}
		}
	}
	@keyframes move {
		0% {
			transform: translateY(40rpx);
		}
		100% {
			transform: translateY(-40rpx);
		}
	}
}
</style>
