<template>
	<div>
		<!-- background (unchanged) -->
		<div
			class="fixed inset-0 z-0 bg-no-repeat bg-center"
			style="background-image: url('/_BG_ART_LogIn_home_v2.jpg'); background-size: auto 100%; opacity: 0.5"
		></div>

		<!-- header -->
		<div v-if="step !== 3" class="relative z-0 header py-4 text-center px-4">
			<h1 v-if="step === 1" class="text-base font-bold text-black">Learn with Ready-Made Patterns!</h1>
			<h1 v-else class="text-3xl font-bold py-4 text-black uppercase">
				{{ step === 2 ? selectedType : `${selectedPattern} Cut Details` }}
			</h1>
			<p v-if="step === 1" class="mt-2 max-w-xl mx-auto text-xs text-black">
				Choose from our standard size sewing patterns to get started on your next project. Whether you’re
				looking for Tops, Bottoms, or a Dress, each template is ready-made and easy to follow—perfect for
				quick creations without the need for custom measurements.
			</p>
			<p v-else-if="step === 3" class="mt-1 max-w-xl mx-auto text-xs text-black">
				Below are your pattern template and the cut‐lay guide. Hit “Save PDF” when you’re ready!
			</p>
		</div>

		<!-- card -->
		<div ref="pdfContent" class="relative z-0 card">
			<Transition name="fade" mode="out-in">
				<!-- STEP 1 -->
				<div v-if="step === 1" key="step-1" class="space-y-6">
					<h2 class="text-black text-lg font-semibold">Select Garment Type</h2>
					<div class="grid grid-cols-1 gap-2">
						<button class="btn" @click="selectType('Tops')">Tops</button>
						<button class="btn" @click="selectType('Bottoms')">Bottoms</button>
						<button class="btn" @click="selectType('Dress')">Dress</button>
					</div>
				</div>

				<!-- STEP 2 -->
				<div v-else-if="step === 2" key="step-2" class="space-y-4">
					<div class="grid grid-cols-2 gap-y-4 gap-x-1 mt-4 px-20 justify-items-center">
						<button
							v-for="item in patternsByType[selectedType]"
							:key="item.name"
							class="icon-box"
							@click="selectPattern(item)"
						>
							<img :src="`/${item.src}`" :alt="item.name" class="icon-img" />
							<span class="icon-label">{{ item.name }}</span>
						</button>
					</div>
					<button class="btn mt-6" @click="goBack">← Back</button>
				</div>

				<!-- STEP 3 -->
				<div v-else-if="step === 3" key="step-3" class="space-y-6 text-center">
					<h2 class="text-black text-lg font-semibold">{{ selectedPattern }} Cut Details</h2>
					<div class="grid grid-cols-2 gap-4 mt-4 justify-items-center">
						<img
							:src="`/${patternDetails[selectedPattern].templateSrc}`"
							:alt="`${selectedPattern} template`"
							class="max-w-full h-auto rounded"
						/>
						<img
							:src="`/${patternDetails[selectedPattern].guideSrc}`"
							:alt="`${selectedPattern} guide`"
							class="max-w-full h-auto rounded"
						/>
					</div>
					<button class="btn no-pdf w-full mt-4" @click="savePdf">Save PDF</button>
					<button class="btn no-pdf w-full mt-2" @click="backToPatterns">← Back</button>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({
	layout: 'customizationwindow',
	title: 'Sewing Pattern Guide',
	headerBg: '#ffffff',
	headerBorder: '#ffa5a5',
	mainBg: '#ffffff',
})

// Controls which view is shown
const step = ref(1)
const selectedType = ref('')
const selectedPattern = ref('')

const pdfContent = ref<HTMLElement | null>(null)

// Your existing pattern list (step 2)
const patternsByType: Record<string, { name: string; src: string }[]> = {
	Tops: [
		{ name: 'T-Shirt', src: 'GuideTop_TShirt.png' },
		{ name: 'Sleeveless', src: 'GuideTop_Sleeveless.png' },
		{ name: 'Longsleeves', src: 'GuideTop_Longsleeves.png' },
	],
	Bottoms: [
		{ name: 'Pants', src: 'GuideBottom_Pants.png' },
		{ name: 'Shorts', src: 'GuideBottom_Shorts.png' },
		{ name: 'Skirts', src: 'GuideBottom_Skirts.png' },
	],
	Dress: [
		{ name: 'A-line', src: 'GuideDress_Aline.png' },
		{ name: 'Shirt', src: 'GuideDress_Shirt.png' },
		{ name: 'Bodycon', src: 'GuideDress_Bodycon.png' },
		{ name: 'Peplum', src: 'GuideDress_Peplum.png' },
		{ name: 'Yoke', src: 'GuideDress_Yoke.png' },
	],
}

// New mapping for step 3
const patternDetails: Record<string, { templateSrc: string; guideSrc: string }> = {
	'T-Shirt': {
		templateSrc: 'GuideTemplate_TShirt.jpg',
		guideSrc: 'Guide_TShirt.png',
	},
	Pants: {
		templateSrc: 'GuideTemplate_Pants.jpg',
		guideSrc: 'Guide_Pants.png',
	},
	// add more when you have them...
}

function selectType(type: string) {
	selectedType.value = type
	step.value = 2
}

function goBack() {
	step.value = 1
}

function selectPattern(item: { name: string; src: string }) {
	selectedPattern.value = item.name
	step.value = 3
}

// Back from step 3 to the pattern grid (step 2)
function backToPatterns() {
	step.value = 2
}

// Stub for your PDF save logic
async function savePdf() {
	if (!pdfContent.value) return
	const { default: html2canvas } = await import('html2canvas')
	const canvas = await html2canvas(pdfContent.value, {
		scale: window.devicePixelRatio,
		useCORS: true,
		backgroundColor: '#fff',
		ignoreElements: (el) => el.classList?.contains('no-pdf'),
	})
	const imgData = canvas.toDataURL('image/png')
	const { jsPDF: JsPDF } = await import('jspdf')
	const pdf = new JsPDF({
		unit: 'px',
		format: [canvas.width, canvas.height],
		orientation: 'portrait',
	})
	pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
	pdf.save('pattern.pdf')
}
</script>

<style lang="postcss">
.header {
	@apply w-full bg-white shadow-md shadow-gray-400;
}
.card {
	@apply mx-auto mt-6 max-w-md bg-white p-6 rounded-lg shadow-md shadow-gray-400;
}
.btn {
	@apply w-full bg-[#FF0066] text-white text-sm py-2 px-4 rounded-lg shadow-md shadow-gray-400 transition ease-in-out;
}
.btn:hover {
	@apply bg-pink-500;
}
/* square container now holds img + label */
.icon-box {
	@apply w-28 h-28 bg-[#f4bbbb] border-2 border-black
  flex flex-col items-center justify-center rounded;
}
.icon-img {
	@apply max-h-16 object-contain;
}
.icon-label {
	@apply text-xs text-black mt-1;
}
/* fade */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
