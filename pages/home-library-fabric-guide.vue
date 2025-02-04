<template>
	<div class="space-y-4 p-6">
		<h2 class="text-2xl font-bold mb-4 mt-8">Fabric Guide</h2>

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

<script>
import { foldersData } from '@/assets/foldersData'
import FolderItem from '~/components/FolderItem.vue'

export default {
	components: {
		FolderItem,
	},
	data() {
		return {
			activeFolderIndex: null,
			activePdfIndex: {},
			folders: foldersData, // Use the imported data here
		}
	},
	methods: {
		toggleFolder(folderIndex) {
			this.activeFolderIndex = this.activeFolderIndex === folderIndex ? null : folderIndex
		},
		togglePdfViewer(folderIndex, pdfIndex) {
			this.activePdfIndex[folderIndex] = this.activePdfIndex[folderIndex] === pdfIndex ? null : pdfIndex
		},
	},
}
</script>

<style scoped>
.pdf-container {
	width: 100%;
	height: 500px;
	overflow: hidden;
	border: 1px solid #ccc;
}

iframe {
	width: 100%;
	height: 100%;
}
</style>
