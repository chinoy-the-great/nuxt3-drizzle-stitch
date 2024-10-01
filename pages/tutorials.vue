<template>
	<div class="max-w-4xl mx-auto p-6 bg-nude-50 rounded-lg shadow-lg">
		<h1 class="text-4xl font-extrabold text-nude-900 mb-6 text-center">Video Tutorials</h1>
		<p class="text-lg text-nude-600 mb-8 text-center">
			Explore our curated list of video tutorials. Click on any video to watch it.
		</p>

		<!-- List of Videos -->
		<div v-for="(video, index) in videos" :key="index" class="mb-8">
			<div class="aspect-w-16 aspect-h-9">
				<!-- YouTube iframe for each video -->
				<iframe
					:src="`https://www.youtube.com/embed/${video.id}`"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					class="w-full h-full"
				></iframe>
			</div>
			<h3 class="text-xl font-semibold text-nude-700 mt-4">{{ video.title }}</h3>
			<p class="text-nude-600">{{ video.description }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Array of video details
const videos = ref([
	{
		id: 'tBudnRKg_r8',
		title: 'Video Tutorial 1',
		description: 'Description for video tutorial 1.',
	},
	{
		id: 'OpNU-PRxMqE',
		title: 'Video Tutorial 2',
		description: 'Description for video tutorial 2.',
	},
	{
		id: 'KDvK_q7ohaE',
		title: 'Video Tutorial 3',
		description: 'Description for video tutorial 3.',
	},
])
</script>

<style scoped>
/* Style adjustments for the video aspect ratio */
.aspect-w-16 {
	position: relative;
	width: 100%;
}

.aspect-h-9 {
	padding-top: 56.25%; /* Aspect ratio for 16:9 */
}

.aspect-w-16 iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
