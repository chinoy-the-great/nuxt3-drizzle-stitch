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
				<div class="w-full h-1/2 mt-4 border border-nude-300 rounded-lg">
					<PDF :src="pdf.url" />
				</div>
				<!-- Download Button -->
				<div class="mt-4">
					<a
						:href="pdf.url"
						download
						class="inline-flex items-center px-4 py-2 bg-nude-500 text-white rounded hover:bg-nude-600 transition duration-200"
					>
						Download PDF
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 ml-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M3 3a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm1 0v10h12V3H4zm5 7a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 11-2 0v-3H8v3a1 1 0 11-2 0v-3h2z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import PDF from 'pdf-vue3'
import { ref } from 'vue'

// Sample list of PDFs
const pdfs = ref([
	{
		title: 'Fabric Guide 1',
		description: 'Description for fabric guide 1',
		url: '/FABRIC TYPES.pdf',
	},
	{
		title: 'Fabric Guide 2',
		description: 'Description for fabric guide 2',
		url: '/METHODS BEFORE CUTTING THE CLOTH.pdf',
	},
	{
		title: 'Fabric Guide 3',
		description: 'Description for fabric guide 3',
		url: '/TIPS ON HOW TO HANDLE AND CARE OF DIFFERENT FABRICS.pdf',
	},
	{
		title: 'Fabric Guide 4',
		description: 'Description for fabric guide 4',
		url: '/WAYS ON HOLDING THE FABRIC.pdf',
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
