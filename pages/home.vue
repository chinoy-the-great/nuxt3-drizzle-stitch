<template>
	<div class="mx-auto w-full max-w-1/2">
		<!-- Header Image -->
		<div class="p-4">
			<!-- Main Image with thicker border, darker shadow, and taller height -->
			<img
				src="/_BG_ART_LogIn_home_v2.jpg"
				alt="Login Header"
				class="w-full h-[30vh] object-cover rounded-lg border-4 border-[#f4bbbb] shadow-md shadow-gray-400"
			/>
		</div>

		<!-- Icon Buttons -->
		<div class="flex overflow-x-auto space-x-6 mb-6 pb-4 mx-4 custom-scrollbar">
			<!-- First Icon (Fabric Guide) -->
			<!-- First Icon (Fabric Guide) with White Box -->
			<!-- First Icon (Fabric Guide) with White Box -->
			<div class="flex justify-between space-x-4">
				<!-- First Icon (Fabric Guide) -->
				<div
					class="bg-white rounded-3xl p-2 inline-flex items-center justify-center w-2/5 flex-shrink-0 flex-col"
				>
					<img
						src="/public/Book_Icon.png"
						alt="Fabric Guide Icon"
						class="colored-icon h-24 object-contain cursor-pointer flex-shrink-0"
						@click="selectedPage = 'fabricGuide'"
					/>
					<p class="text-center text-base font-bold colored-icon leading-none">
						DRESSMAKING
						<br />
						LIBRARY
					</p>
					<!-- Label below the icon -->
				</div>

				<!-- Second Icon (Tutorials) -->
				<div
					class="bg-white rounded-3xl p-2 inline-flex items-center justify-center w-2/5 flex-shrink-0 flex-col"
				>
					<img
						src="/public/Video_Icon.png"
						alt="Tutorials Icon"
						class="colored-icon h-24 object-contain cursor-pointer flex-shrink-0"
						@click="selectedPage = 'tutorials'"
					/>
					<p class="text-center text-base font-bold colored-icon leading-none">
						VIDEO
						<br />
						TUTORIAL
					</p>
					<!-- Label below the icon -->
				</div>

				<!-- Third Icon (Sewing Machine) -->
				<div
					class="bg-white rounded-3xl p-2 inline-flex items-center justify-center w-2/5 flex-shrink-0 flex-col"
				>
					<img
						src="/public/Sewing_Icon.png"
						alt="Sewing Machine Icon"
						class="colored-icon h-24 object-contain cursor-pointer flex-shrink-0"
						@click="selectedPage = 'sewingModel'"
					/>
					<p class="text-center text-base font-bold colored-icon leading-none">
						VIEW 3D
						<br />
						SEWING MACHINE
					</p>
					<!-- Label below the icon -->
				</div>
			</div>
		</div>

		<!-- Conditional Rendering Based on Selected Page -->
		<div>
			<!-- Dynamically render the components -->
			<component :is="currentComponent" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'

// Define reactive state for selected page
const selectedPage = ref('fabricGuide') // Default to 'fabricGuide'

// Lazy-load components for better performance
const fabricGuide = defineAsyncComponent(() => import('~/pages/home-dressmaking-library.vue'))
const tutorials = defineAsyncComponent(() => import('~/pages/tutorials.vue'))
const sewingModel = defineAsyncComponent(() => import('~/pages/sewingmodel.vue'))

// Computed property to return the current component based on selectedPage
const currentComponent = computed(() => {
	if (selectedPage.value === 'fabricGuide') {
		return fabricGuide
	} else if (selectedPage.value === 'tutorials') {
		return tutorials
	} else if (selectedPage.value === 'sewingModel') {
		return sewingModel
	} else {
		return null
	}
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
</style>
