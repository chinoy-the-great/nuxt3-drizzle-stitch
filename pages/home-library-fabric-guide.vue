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
import { foldersData } from '@/assets/foldersData'
import { sewingTechniquesData } from '@/assets/sewingTechniquesData'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import FolderItem from '~/components/FolderItem.vue'

const route = useRoute()
const activeFolderIndex = ref(null)
const activePdfIndex = ref({})
const folders = ref([])

// Compute the title based on the selected data
const pageTitle = computed(() => {
	return route.query.type === 'sewing' ? 'Sewing Techniques' : 'Fabric Guide'
})

// Function to load the correct data based on query parameter
const loadData = () => {
	folders.value = route.query.type === 'sewing' ? sewingTechniquesData : foldersData
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
