<template>
	<div class="space-y-4 p-6 mb-20">
		<h2 class="text-2xl font-bold mb-4 mt-8">{{ pageTitle }}</h2>

		<!-- Folder List -->
		<div v-for="(folder, folderIndex) in folders" :key="folderIndex">
			<FolderItem
				:folder="folder"
				:folder-index="folderIndex"
				:active-folder-index="activeFolderIndex"
				:active-pdf-index="activePdfIndex"
				@toggle-folder="toggleFolder"
				@toggle-pdf-viewer="togglePdfViewer"
			/>
		</div>
	</div>
</template>

<script setup>
import { dressmakingToolsData } from '@/assets/dressmakingToolsData'
import { foldersData } from '@/assets/foldersData'
import { sewingTechniquesData } from '@/assets/sewingTechniquesData'
import { troubleshootingData } from '@/assets/troubleshootingData'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import FolderItem from '~/components/FolderItem.vue'

const route = useRoute()
const activeFolderIndex = ref(null)
const activePdfIndex = ref({})
const folders = ref([])

// Define possible data sets
const dataSets = {
	fabric: foldersData,
	sewing: sewingTechniquesData,
	tools: dressmakingToolsData,
	troubleshooting: troubleshootingData,
}

// Compute the page title dynamically
const pageTitle = computed(() => {
	const type = route.query.type
	return (
		{
			fabric: 'Fabric Guide',
			sewing: 'Sewing Techniques',
			tools: 'Dressmaking Tools',
			troubleshooting: 'Troubleshooting Guide',
		}[type] || 'Default Title'
	)
})

// Function to load the correct data set based on query parameter
const loadData = () => {
	const type = route.query.type
	folders.value = dataSets[type] || foldersData // Default to foldersData if no match
}

// Watch for changes in the query parameter and update data
watch(() => route.query.type, loadData, { immediate: true })

// Toggle folder open/close state
const toggleFolder = (folderIndex) => {
	activeFolderIndex.value = activeFolderIndex.value === folderIndex ? null : folderIndex
}

// Toggle PDF viewer
const togglePdfViewer = (folderIndex, pdfIndex) => {
	activePdfIndex.value[folderIndex] = activePdfIndex.value[folderIndex] === pdfIndex ? null : pdfIndex
}
</script>
