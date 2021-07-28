<template>
	<view class="shopDetail">
		<view class="video">
			<video v-if="data.video_url" :src="baseUrl + data.video_url" controls></video>
			<view class="noCentent" v-else>
				<text>暂无内容</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				baseUrl: this.BaseUrl,
				data: {}
			}
		},
		
		onLoad (option) {
			this.data = JSON.parse(option.params)
		},
		
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.shopDetail {
		.video {
			display: flex;
			justify-content: center;
			video {
				width: 100%;
			}
		}
	}
</style>
