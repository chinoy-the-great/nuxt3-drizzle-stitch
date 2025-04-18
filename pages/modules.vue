<template>
	<div class="min-h-screen bg-white">
		<!-- Header Image -->
		<div
			class="w-full shadow-md shadow-gray-400"
			style="
				background-image: url('/_BG_ART_LogIn_home_v2.jpg');
				background-size: cover;
				background-position: center;
				height: 12vh;
			"
		></div>
		<div v-for="(grade, gradeIndex) in localFoldersData" :key="gradeIndex" class="px-8">
			<h1 class="text-2xl font-bold mb-2 mt-8">{{ grade.mainLabel }}</h1>
			<div v-for="(item, itemIndex) in grade.items" :key="itemIndex">
				<h2 v-if="item.type === 'subLabel'" class="text-base font-semibold mb-2 mt-2">
					{{ item.name }}
				</h2>
				<div
					v-else-if="item.type === 'pdf'"
					class="flex items-center bg-[#ffa5a5] rounded-xl w-full cursor-pointer overflow-hidden h-[70px] shadow-md shadow-gray-400 mb-4"
					@click="togglePdf(item)"
				>
					<!-- Thumbnail -->
					<div
						class="bg-gray-200 rounded-l-xl h-[70px] w-20 flex items-center justify-center min-w-[80px] max-w-[80px]"
					>
						<img src="/Modules_PDF_Icon.png" alt="PDF Icon" class="h-10 w-10 object-contain" />
					</div>
					<div
						class="flex-1 flex flex-col justify-center items-start text-left bg-[#ffa5a5] rounded-r-xl h-[70px] p-4 min-h-[70px]"
					>
						<p class="text-xxs font-bold text-black">{{ item.title }}</p>
						<p class="text-xxs text-black">{{ item.secondaryTitle }}</p>
					</div>
					<!-- Expand/Collapse Icon -->
					<div class="pr-4">
						<i
							class="fas text-lg text-black transition-transform duration-300"
							:class="[item.expanded ? 'fa-angle-up' : 'fa-angle-down']"
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
					<div
						v-if="item.type === 'pdf' && item.expanded"
						class="bg-[#ffa5a5] rounded-lg mb-4 p-2 text-white overflow-hidden"
					>
						<!-- Video Player -->
						<iframe class="w-full h-96 rounded-b-lg" :src="item.url"></iframe>
						<!-- Description -->
					</div>
				</Transition>
			</div>
		</div>
	</div>
</template>

<script setup>
import { dressmakingToolsData } from 'assets/dressmakingToolsData.js'
// Import your data sets
import { foldersData } from 'assets/foldersData.js'

import { sewingTechniquesData } from 'assets/sewingTechniquesData.js'
import { troubleshootingData } from 'assets/troubleshootingData.js'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
	layout: 'window',
	title: 'Dressmaking Learning Hub',
})

const route = useRoute()
const localFoldersData = ref([])

// Function to select data based on the 'grade' query parameter
const selectData = () => {
	const keyword = route.query.grade
	let selectedData

	switch (keyword) {
		case 'sewingTechniques':
			selectedData = sewingTechniquesData
			break
		case 'dressmakingTools':
			selectedData = dressmakingToolsData
			break
		case 'troubleshooting':
			selectedData = troubleshootingData
			break
		default:
			selectedData = foldersData
	}

	// Deep copy to avoid mutating original data
	const copiedData = JSON.parse(JSON.stringify(selectedData))

	// Initialize 'expanded' property for PDF items
	copiedData.forEach((grade) => {
		grade.items.forEach((item) => {
			if (item.type === 'pdf') {
				item.expanded = false
			}
		})
	})

	localFoldersData.value = copiedData
}

// Initialize data on component mount
onMounted(() => {
	selectData()
})

// Watch for changes in the 'grade' query parameter
watch(
	() => route.query.grade,
	() => {
		selectData()
	},
)

// Function to toggle the 'expanded' state of PDF items
const togglePdf = (item) => {
	item.expanded = !item.expanded
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
