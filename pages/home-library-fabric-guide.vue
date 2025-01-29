<template>
	<div class="space-y-4 p-6">
		<h2 class="text-2xl font-bold mb-4">Fabric Guide</h2>

		<!-- Folder List -->
		<div v-for="(folder, folderIndex) in folders" :key="folderIndex">
			<!-- Folder Section -->
			<div
				class="border border-gray-300 rounded-lg mb-6 p-6 transition-shadow hover:shadow-lg cursor-pointer"
				:class="folderItemClass"
				@click="toggleFolder(folderIndex)"
			>
				<div class="text-xl font-semibold text-gray-700 flex justify-between items-center">
					<h3>{{ folder.name }}</h3>
					<!-- Indicator for expand/collapse -->
					<span
						class="transform transition-transform"
						:class="{ 'rotate-180': activeFolderIndex === folderIndex }"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-gray-500"
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
			</div>

			<!-- Expandable PDFs and Subfolders -->
			<div v-if="activeFolderIndex === folderIndex" class="pl-6 space-y-4">
				<!-- PDFs in this folder -->
				<div
					v-for="(pdf, pdfIndex) in folder.pdfs"
					:key="pdfIndex"
					class="border border-gray-200 rounded-lg mb-4 p-4 bg-green-100"
				>
					<!-- Clickable PDF title -->
					<div
						class="cursor-pointer text-lg font-semibold text-gray-700 flex justify-between items-center"
						@click="togglePdfViewer(folderIndex, pdfIndex)"
					>
						<span>{{ pdf.title }}</span>
						<!-- Indicator for expand/collapse -->
						<span
							class="transform transition-transform"
							:class="{ 'rotate-180': activePdfIndex[folderIndex] === pdfIndex }"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-gray-500"
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

					<!-- Expandable PDF Content -->
					<div v-if="activePdfIndex[folderIndex] === pdfIndex" class="mt-4">
						<p class="text-gray-600 mb-4">{{ pdf.description }}</p>

						<!-- PDF Viewer (using iframe for simplicity) -->
						<div class="w-full h-96 border border-gray-300 rounded-lg">
							<iframe :src="pdf.url" class="w-full h-full" frameborder="0"></iframe>
						</div>

						<!-- Download Button -->
						<div class="mt-4">
							<a
								:href="pdf.url"
								download
								class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
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

				<!-- Subfolders in this folder -->
				<div v-for="(subFolder, subFolderIndex) in folder.subfolders" :key="subFolderIndex">
					<!-- Recursively Render Subfolder -->
					<FolderItem
						:folder="subFolder"
						:folder-index="folderIndex"
						:active-folder-index="activeFolderIndex"
						:active-pdf-index="activePdfIndex"
						@toggle-folder="toggleFolder"
						@toggle-pdf-viewer="togglePdfViewer"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// FolderItem is a component that handles rendering both PDFs and subfolders recursively
import FolderItem from '~/components/FolderItem.vue'

export default {
	components: {
		FolderItem,
	},
	data() {
		return {
			activeFolderIndex: null, // Index of the currently active folder
			activePdfIndex: {}, // Object to track active PDFs in each folder
			folders: [
				{
					name: 'Grade 9',
					pdfs: [],
					subfolders: [
						{
							name: 'Quarter 1',
							pdfs: [
								{
									title: 'Module 1',
									description: '',
									url: '/pdf/Grade_9/Quarter_1/HE_DRESSMAKING_GR9_Q1_MODULE-1.pdf',
								},
								{
									title: 'Module 2',
									description: '',
									url: '/pdf/Grade_9/Quarter_1/HE_DRESSMAKING_GR9_Q1_MODULE-2.pdf',
								},
								{
									title: 'Module 3',
									description: '',
									url: '/pdf/Grade_9/Quarter_1/HE_DRESSMAKING_GR9_Q1_MODULE-3.pdf',
								},
								{
									title: 'Module 4',
									description: '',
									url: '/pdf/Grade_9/Quarter_1/HE_DRESSMAKING_GR9_Q1_MODULE-4.pdf',
								},
								{
									title: 'Module 5',
									description: '',
									url: '/pdf/Grade_9/Quarter_1/HE_DRESSMAKING_GR9_Q1_MODULE-5.pdf',
								},
							],
							subfolders: [],
						},
						{
							name: 'Quarter 2',
							pdfs: [
								{
									title: 'Module 1',
									description: '',
									url: '/pdf/Grade_9/Quarter_2/DRESSMAKING 9_Q2_MODULE-1.pdf',
								},
								{
									title: 'Module 2',
									description: '',
									url: '/pdf/Grade_9/Quarter_2/DRESSMAKING 9_Q2_MODULE-2.pdf',
								},
								{
									title: 'Module 3',
									description: '',
									url: '/pdf/Grade_9/Quarter_2/DRESSMAKING 9_Q2_MODULE-3.pdf',
								},
								{
									title: 'Module 4',
									description: '',
									url: '/pdf/Grade_9/Quarter_2/DRESSMAKING 9_Q2_MODULE-4.pdf',
								},
								{
									title: 'Module 5',
									description: '',
									url: '/pdf/Grade_9/Quarter_2/DRESSMAKING 9_Q2_MODULE-5.pdf',
								},
								{
									title: 'Module 6',
									description: '',
									url: '/pdf/Grade_9/Quarter_2/DRESSMAKING 9_Q2_MODULE-6.pdf',
								},
								{
									title: 'Module 7',
									description: '',
									url: '/pdf/Grade_9/Quarter_2/DRESSMAKING 9_Q2_MODULE-7.pdf',
								},
							],
							subfolders: [],
						},
					],
				},
				{
					name: 'Grade 10',
					pdfs: [
						{
							title: 'Polyester',
							description: 'A guide to working with polyester fabric.',
							url: '/pdf/Polyester.pdf',
						},
						{
							title: 'Nylon',
							description: 'A guide to working with nylon fabric.',
							url: '/pdf/Nylon.pdf',
						},
					],
					subfolders: [],
				},
			],
		}
	},
	computed: {
		folderItemClass() {
			return 'bg-blue-100' // Blue background for folders
		},
	},
	methods: {
		toggleFolder(folderIndex) {
			// Toggle folder visibility
			this.activeFolderIndex = this.activeFolderIndex === folderIndex ? null : folderIndex
		},
		togglePdfViewer(folderIndex, pdfIndex) {
			// Toggle PDF visibility for a specific PDF in a folder
			this.activePdfIndex[folderIndex] = this.activePdfIndex[folderIndex] === pdfIndex ? null : pdfIndex
		},
	},
}
</script>

<style scoped>
/* Styling for the PDF viewer container */
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
