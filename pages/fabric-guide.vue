<template>
	<div class="max-w-4xl mx-auto p-6 bg-nude-50 rounded-lg shadow-lg">
		<h1 class="text-4xl font-extrabold text-nude-900 mb-6 text-center">Fabric Guide</h1>
		<p class="text-lg text-nude-600 mb-8 text-center">
			Explore the essential fabric guides below. Click to view the PDF in a viewport.
		</p>

		<!-- List of PDFs -->
		<div
			v-for="(pdf, index) in pdfs"
			:key="index"
			class="border border-nude-300 rounded-lg mb-6 p-6 bg-white transition-shadow hover:shadow-lg"
		>
			<!-- Clickable title -->
			<div
				class="cursor-pointer text-xl font-semibold flex justify-between items-center text-nude-700"
				@click="togglePdf(index)"
			>
				<h3>{{ pdf.title }}</h3>
				<!-- Indicator for expand/collapse -->
				<span class="transform transition-transform" :class="{ 'rotate-180': activeIndex === index }">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-nude-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</span>
			</div>

			<!-- Expandable PDF Viewport -->
			<div v-if="activeIndex === index" class="mt-4 text-nude-600">
				<p>{{ pdf.description }}</p>
				<!-- PDF Viewport -->
				<iframe :src="pdf.url" class="w-full h-96 mt-4 border border-nude-300 rounded-lg"></iframe>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Sample list of PDFs
const pdfs = ref([
	{
		title: 'Fabric Guide 1',
		description: 'Description for fabric guide 1',
		url: '/Fabric Types.pdf',
	},
	{
		title: 'Fabric Guide 2',
		description: 'Description for fabric guide 2',
		url: '/Method Before cutting the Cloth.pdf',
	},
	{
		title: 'Fabric Guide 3',
		description: 'Description for fabric guide 3',
		url: '/Tips on how to handle and care of different fabrics.pdf',
	},
])

// State to track the currently opened/expanded PDF
const activeIndex = ref<number | null>(null)

// Function to toggle which PDF is expanded
const togglePdf = (index: number) => {
	activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
/* No extra styles since Tailwind is being used */
</style>
