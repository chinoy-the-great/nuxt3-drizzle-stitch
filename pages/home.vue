<template>
	<div class="mx-auto w-full max-w-1/2">
		<!-- Header Image -->
		<img
			src="/_BG_ART_LogIn_alt.jpg"
			alt="Login Header"
			class="w-full h-[25vh] object-cover rounded-t-lg mb-6"
		/>

		<!-- Icon Buttons -->
		<div class="flex justify-center space-x-24 mb-6">
			<!-- First Icon (Fabric Guide) -->
			<img
				src="/public/Book_Icon.png"
				alt="Fabric Guide Icon"
				class="w-24 h-24 cursor-pointer"
				@click="selectedPage = 'fabricGuide'"
			/>
			<!-- Second Icon (Tutorials) -->
			<img
				src="/public/Video_Icon.png"
				alt="Tutorials Icon"
				class="w-24 h-24 cursor-pointer"
				@click="selectedPage = 'tutorials'"
			/>
		</div>

		<!-- Conditional Rendering Based on Selected Page -->
		<div>
			<!-- Dynamically render the components -->
			<component :is="currentComponent" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

// Define reactive state for selected page
const selectedPage = ref('fabricGuide') // Default to 'fabricGuide'

// Lazy-load components for better performance
const fabricGuide = defineAsyncComponent(() => import('~/pages/fabric-guide.vue'))
const tutorials = defineAsyncComponent(() => import('~/pages/tutorials.vue'))

// Computed property to return the current component based on selectedPage
const currentComponent = computed(() => {
	if (selectedPage.value === 'fabricGuide') {
		return fabricGuide
	} else if (selectedPage.value === 'tutorials') {
		return tutorials
	} else {
		return null
	}
})
</script>

<style scoped>
/* Add any additional styling as needed */
</style>
