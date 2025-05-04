<template>
	<div class="max-w-4xl mx-auto p-6 bg-transparent min-h-screen rounded-lg shadow-lg">
		<!-- List of Videos -->
		<div v-for="(video, index) in videos" :key="index" class="mb-6">
			<!-- Collapsible Header -->
			<div
				class="flex items-center bg-[#ffa5a5] rounded-xl h-24 w-full cursor-pointer overflow-hidden"
				@click="toggleVideo(video)"
			>
				<!-- Thumbnail -->
				<img :src="video.thumbnail" alt="Video Thumbnail" class="h-full w-auto object-cover" />

				<!-- Title + Author -->
				<div class="flex-1 flex flex-col justify-center items-center text-center">
					<p class="text-xs font-bold text-black">
						{{ video.title }}
					</p>
					<p class="text-[10px] text-black">by Stitch In Time</p>
				</div>

				<!-- Expand/Collapse Icon -->
				<div class="pr-4">
					<i
						class="fas text-lg text-black transition-transform duration-300"
						:class="[video.expanded ? 'fa-angle-up' : 'fa-angle-down']"
					></i>
				</div>
			</div>

			<!-- Expandable Content -->
			<Transition
				name="expand"
				enter-active-class="transition-all duration-300 ease-in-out"
				leave-active-class="transition-all duration-300 ease-in-out"
				enter-from-class="max-h-0 opacity-0"
				enter-to-class="max-h-[1000px] opacity-100"
				leave-from-class="max-h-[1000px] opacity-100"
				leave-to-class="max-h-0 opacity-0"
			>
				<div v-if="video.expanded" class="bg-[#ffa5a5] rounded-lg mt-2 text-white overflow-hidden">
					<!-- Video Player -->
					<iframe class="w-full h-64 rounded-b-lg" :src="video.url" allowfullscreen></iframe>

					<!-- Description -->
					<div class="p-4">
						<p class="text-black text-xs">{{ video.description }}</p>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
	layout: 'window',
	title: 'Video Tutorials',
})

const videos = ref([
	{
		url: 'https://www.youtube.com/embed/MNTbF1McIsk',
		title: 'How to Thread a Domestic / Manual Sewing Machine',
		description: 'Learn how to properly thread your sewing machine step-by-step.',
		thumbnail: '/Tutorials_Thumbnail.png',
		expanded: false,
	},
	{
		url: 'https://www.youtube.com/embed/FOe79uMS0xo',
		title: 'Parts of the Domestic / Manual Sewing Machine',
		description: 'Understand the different parts and functions of your sewing machine.',
		thumbnail: '/Tutorials_Thumbnail_2.png',
		expanded: false,
	},
	{
		url: 'https://www.youtube.com/embed/PdEaIa-_0Ro',
		title: '5 Kinds of Sewing Stitches',
		description: 'An in-depth tutorial on various sewing stitches.',
		thumbnail: '/Tutorials_Thumbnail_3.png',
		expanded: false,
	},
	{
		url: 'https://www.youtube.com/embed/OEC_sGdPNOo',
		title: 'Measuring Tools',
		description: 'Tools, materials, and equipment used in sewing.',
		thumbnail: '/Tutorials_Thumbnail_4.png',
		expanded: false,
	},
	{
		url: 'https://www.youtube.com/embed/2h6osQ26mb0',
		title: 'Marking Tools',
		description: 'Tools, materials, and equipment used in sewing.',
		thumbnail: '/Tutorials_Thumbnail_5.png',
		expanded: false,
	},
	{
		url: 'https://www.youtube.com/embed/IqY8zw1Nmks',
		title: 'Cutting Tools',
		description: 'Tools, materials, and equipment used in sewing.',
		thumbnail: '/Tutorials_Thumbnail_6.png',
		expanded: false,
	},
	{
		url: 'https://www.youtube.com/embed/uP_gTd7jGLg',
		title: 'Taking Body Measurements',
		description: 'A tutorial on the proper way of taking body measurements.',
		thumbnail: '/Tutorials_Thumbnail_7.png',
		expanded: false,
	},
	{
		url: 'https://www.youtube.com/embed/WaLmfM1RNTo',
		title: 'Needle Getting Stuck in the Material',
		description: 'Troubleshooting a common error in sewing.',
		thumbnail: '/Tutorials_Thumbnail_8.png',
		expanded: false,
	},
	{
		url: 'https://www.youtube.com/embed/5w1n8jGT2MM',
		title: 'Kinds of Sewing Stitches',
		description: 'An introduction on different kids of sewing stitches.',
		thumbnail: '/Tutorials_Thumbnail_9.png',
		expanded: false,
	},
])

const toggleVideo = (video) => {
	video.expanded = !video.expanded
}
</script>
