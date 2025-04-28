<template>
	<div class="mx-auto w-full max-w-1/2 mb-24">
		<!-- Greeting and User Name -->
		<h1 class="text-black text-3xl font-semibold px-4 pt-4">Hello!</h1>
		<p v-if="userStore.name" class="text-black text-3xl font-semibold px-4">{{ userStore.name }}</p>

		<div class="p-4">
			<!-- Carousel Wrapper -->
			<div>
				<!-- Image Carousel -->
				<div
					ref="carousel"
					class="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 scrollbar-hide"
				>
					<img
						v-for="(image, index) in images"
						:key="index"
						:src="image"
						:alt="`Banner ${index + 1}`"
						class="flex-shrink-0 w-full sm:w-[90vw] h-[35vh] object-cover rounded-lg border-4 border-[#f4bbbb] snap-start"
					/>
				</div>
			</div>

			<!-- Indicator Dots (Below Carousel) -->
			<div class="mt-4 flex justify-center space-x-2">
				<span
					v-for="(image, index) in images"
					:key="`dot-${index}`"
					class="w-2 h-2 rounded-full"
					:class="currentIndex === index ? 'bg-[#ff0066]' : 'bg-gray-300'"
				></span>
			</div>
		</div>

		<h2 class="text-black text-lg font-semibold px-4 pt-4 pb-2">Dressmaking Learning Hub</h2>
		<!-- Icon Buttons -->
		<div class="flex overflow-x-auto gap-2 mb-6 pb-4 px-4 custom-scrollbar">
			<div class="flex gap-2 justify-center w-full">
				<!-- Loop through icons -->
				<div
					v-for="(icon, index) in icons"
					:key="index"
					class="flex flex-col items-center flex-[1_0_23%] min-w-[23%] max-w-[23%]"
				>
					<!-- Icon Box (Square) -->
					<NuxtLink
						:to="{ path: '/modules', query: { grade: icon.keyword } }"
						class="video-card bg-[#ffa5a5] rounded-xl p-2 flex items-center justify-center w-full aspect-square cursor-pointer"
					>
						<img :src="icon.src" :alt="icon.alt" class="h-12 w-12 object-contain" />
					</NuxtLink>
					<!-- Label below icon box -->
					<p class="text-center text-xxs font-bold leading-none mt-2">
						{{ icon.label[0] }}
						<br />
						{{ icon.label[1] }}
					</p>
				</div>
			</div>
		</div>

		<h2 class="text-black text-lg font-semibold px-4 pb-2">Dressmaking Tools</h2>
		<div class="flex gap-4 px-4 mb-6">
			<!-- Loop through buttonItems -->
			<NuxtLink
				v-for="(button, index) in buttonItems"
				:key="index"
				:to="button.clickAction"
				class="video-card flex items-center bg-[#ffa5a5] rounded-xl px-4 h-20 py-2 w-1/2 cursor-pointer"
			>
				<!-- Icon on the left -->
				<img :src="button.src" :alt="button.alt" class="h-14 w-14 object-contain mr-3" />

				<!-- Text on the right -->
				<div class="flex-1 flex justify-center">
					<p class="text-xxs font-bold text-black">{{ button.label }}</p>
				</div>
			</NuxtLink>
		</div>

		<div class="flex justify-between items-center px-4 pb-2">
			<h2 class="text-black text-lg font-semibold">Video Tutorials</h2>
			<span class="text-[10px] text-[#ff0066] cursor-pointer">See all</span>
		</div>
		<NuxtLink to="/tutorials" class="flex px-4 mb-6">
			<div
				class="video-card flex items-center bg-[#ffa5a5] rounded-xl h-24 w-full cursor-pointer overflow-hidden"
			>
				<!-- Thumbnail on the left, full height, no left spacing -->
				<img src="/Tutorials_Thumbnail.png" alt="Video Thumbnail" class="h-full w-auto object-cover" />

				<!-- Title and author on the right -->
				<div class="flex-1 flex flex-col justify-center items-center text-center">
					<p class="text-xs font-bold text-black">
						How To Thread a Domestic /
						<br />
						Manual Sewing Machine
					</p>
					<p class="text-[10px] text-black">by Stitch In Time</p>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const images = ['/Home_Banner_1.png', '/Home_Banner_2.png', '/Home_Banner_3.png']
const carousel = ref(null)
const currentIndex = ref(0)

const icons = [
	{
		src: '/Hub_Modules.png',
		alt: 'Fabric Guide Icon',
		label: ['MODULES'],
		keyword: 'modules',
	},
	{
		src: '/Hub_Sewing Techniques.png',
		alt: 'Tutorials Icon',
		label: ['SEWING', 'TECHNIQUES'],
		keyword: 'sewingTechniques',
	},
	{
		src: '/Hub_Dressmaking Tools.png',
		alt: 'Sewing Machine Icon',
		label: ['DRESSMAKING', 'TOOLS'],
		keyword: 'dressmakingTools',
	},
	{
		src: '/Hub_Troubleshooting.png',
		alt: 'Troubleshooting Icon',
		label: ['TROUBLESHOOTING'],
		keyword: 'troubleshooting',
	},
]

const buttonItems = [
	{
		src: '/Tools_Customization.png',
		alt: 'Customization Icon',
		label: 'Customization',
		clickAction: '/customization',
	},
	{
		src: '/Tools_3D_Machine.png',
		alt: '3D Machine Icon',
		label: '3D Sewing Machine',
		clickAction: '/sewingmodel',
	},
]

const updateIndexOnScroll = () => {
	if (!carousel.value) return
	const scrollLeft = carousel.value.scrollLeft
	const imageWidth = carousel.value.children[0].offsetWidth + 16 // 16 for spacing
	currentIndex.value = Math.round(scrollLeft / imageWidth)
}

const userStore = useUserStore()

onMounted(() => {
	carousel.value?.addEventListener('scroll', updateIndexOnScroll)
})

onBeforeUnmount(() => {
	carousel.value?.removeEventListener('scroll', updateIndexOnScroll)
})
</script>

<style scoped>
/* Styling to change the color of the icons to #dc6e63 */
.colored-icon {
	/* Approximate #dc6e63 using filters */
	filter: invert(51%) sepia(43%) saturate(457%) hue-rotate(-10deg) brightness(90%) contrast(89%);
	transition: filter 0.3s ease-in-out;
}

.colored-icon:hover {
	filter: invert(51%) sepia(43%) saturate(457%) hue-rotate(-10deg) brightness(110%) contrast(90%);
}

.custom-scrollbar::-webkit-scrollbar {
	height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background: #f5e1c8; /* Light brown track */
	border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #c8a97e; /* Darker brown scrollbar */
	border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #a57c50; /* Darker brown on hover */
}

/* For Firefox */
.custom-scrollbar {
	scrollbar-color: #c8a97e #f5e1c8;
}

.scrollbar-hide::-webkit-scrollbar {
	display: none;
}
.scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
/* Hover just the inner card div */
.video-card:hover {
	background-color: #dc6e63 !important;
}
</style>
