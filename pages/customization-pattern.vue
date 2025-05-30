<template>
	<div>
		<div class="header-image mb-8"></div>

		<div ref="pdfContent" class="card">
			<Transition name="fade" mode="out-in">
				<div :key="step" class="step-container space-y-6">
					<!-- shared title -->
					<h2 class="title" :class="{ 'title--pink': step === 4 || step === 5 }">
						{{ stepTitle }}
					</h2>

					<!-- STEP 1 -->
					<button v-if="step === 1" class="btn" @click="goToStep(2)">Start Customizing</button>

					<!-- STEP 2 -->
					<div v-else-if="step === 2" class="option-list">
						<button class="btn" @click="selectType('top')">Top</button>
						<button class="btn" @click="selectType('bottom')">Bottom</button>
					</div>

					<!-- STEP 3 -->
					<div v-else-if="step === 3" class="option-list">
						<button v-for="style in currentStyles" :key="style" class="btn" @click="selectStyle(style)">
							{{ style }}
						</button>
					</div>

					<!-- STEP 4 -->
					<div v-else-if="step === 4" class="w-full space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<div v-for="field in measurementFields" :key="field.key" class="flex flex-col">
								<label class="label">{{ field.label }} ({{ field.unit }})</label>
								<input v-model="measurements[field.key]" type="number" class="input" />
							</div>
						</div>
						<button class="btn" @click="generatePattern">Generate Pattern</button>
					</div>

					<!-- STEP 5: RESULTS -->
					<div v-else-if="step === 5" class="w-full space-y-6">
						<!-- BIG SIDE VIEW (if you want to overlay here, do likewise) -->
						<div class="relative w-full bg-white p-4 rounded-md" style="max-height: 40vh">
							<img :src="resultImages.side" alt="Side view" class="w-full h-auto" />
							<!-- overlay back‐view labels -->
							<template v-for="f in measurementFields" :key="f.key">
								<div
									v-if="coords.front[f.key]"
									class="absolute text-xxs font-bold text-red-500 bg-transparent px-1 rounded"
									:style="{
										left: `${coords.front[f.key].x}%`,
										top: `${coords.front[f.key].y}%`,
										transform: 'translate(-50%, -50%)',
									}"
								>
									{{ measurements[f.key] }} in.
								</div>
							</template>
						</div>

						<!-- TWO‐COLUMN FRONT + LIST -->
						<div class="grid grid-cols-2 gap-4">
							<div>
								<h3 class="font-semibold mb-2">Your Measurements</h3>
								<ul class="list-disc pl-5 space-y-1 text-sm">
									<li v-for="f in measurementFields" :key="f.key">
										<strong>{{ f.label }}:</strong>
										{{ measurements[f.key] }} {{ f.unit }}
									</li>
								</ul>
							</div>
							<div class="relative bg-white p-4 rounded-md" style="max-height: 40vh">
								<img :src="resultImages.main" alt="Front view" class="w-full h-auto" />
							</div>
						</div>

						<!-- Save buttons -->
						<div>
							<button class="btn no-pdf w-full mb-2" @click="saveCreation">Save in My Creation</button>
							<div class="flex space-x-2">
								<button class="btn no-pdf flex-1" @click="savePdf">Save PDF</button>
								<button class="btn no-pdf flex-1" @click="startOver">Start Over</button>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div>

		<!-- original instructions ONLY at step 4 -->
		<div v-if="step === 4" class="instructions px-8 pb-8">
			<h3 class="instructions-title">Instructions:</h3>
			<div v-for="field in measurementFields" :key="field.key" class="instruction-item">
				<p class="instruction-measure">{{ field.label }}</p>
				<p class="instruction-text">How To Measure: {{ field.description }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { customizationData } from '@/assets/customizationData.js'
import { measurementCoordinates } from '@/assets/measurementCoordinates.js'
import { measurementDefinitions } from '@/assets/measurementDefinitions.js'
import { computed, reactive, ref } from 'vue'
import { useUserStore } from '~/stores/user'

definePageMeta({
	layout: 'customizationwindow',
	title: 'Pattern Customization',
})

/** 1) local TS types */
interface MeasurementField {
	key: string
	label: string
	unit: string
	description: string
}
interface ImagePair {
	main: string
	side: string
}

/** 2) state & store */
const userStore = useUserStore()
const step = ref(1)
const garmentType = ref<'top' | 'bottom' | null>(null)
const selectedStyle = ref<string>('')
const measurements = reactive<Record<string, string>>({})
const pdfContent = ref<HTMLElement | null>(null)

/** 3) computed helpers */

// list of styles for step 3
const currentStyles = computed<string[]>(() => {
	if (!garmentType.value) return []
	return customizationData[garmentType.value].styles
})

// *** updated *** measurementFields now returns full objects
const measurementFields = computed<MeasurementField[]>(() => {
	if (!garmentType.value || !selectedStyle.value) return []

	// get the array of keys for this garment/style
	const mSet = customizationData[garmentType.value].measurements
	const keys = mSet[selectedStyle.value as keyof typeof mSet] ?? mSet.default

	// map each key → its definition
	return keys
		.map((k) => measurementDefinitions.find((d) => d.key === k))
		.filter((d): d is MeasurementField => !!d)
})

// images for step 5 (unchanged)
const resultImages = computed<ImagePair>(() => {
	if (!garmentType.value || !selectedStyle.value) {
		return { main: '', side: '' }
	}
	const imgs = customizationData[garmentType.value].images
	return imgs[selectedStyle.value as keyof typeof imgs] ?? imgs.default
})

const coords = computed(() => {
	if (!selectedStyle.value) return { front: {}, back: {} }
	// guard against missing style
	return measurementCoordinates[selectedStyle.value] || { front: {}, back: {} }
})

// step title (unchanged)
const stepTitle = computed(() => {
	switch (step.value) {
		case 1:
			return 'Create Your Own Pattern'
		case 2:
			return 'Select Garment Type'
		case 3:
			return garmentType.value === 'top' ? 'Select Top Style' : 'Select Bottom Style'
		case 4:
			return 'Enter Your Measurements'
		case 5:
			return 'Result of Your Pattern'
		default:
			return ''
	}
})

/** 4) navigation & button handlers */

function goToStep(n: number) {
	step.value = n
}

function selectType(type: 'top' | 'bottom') {
	garmentType.value = type
	step.value = 3
}

function selectStyle(style: string) {
	selectedStyle.value = style
	// reset + init measurements
	Object.keys(measurements).forEach((k) => delete measurements[k])
	measurementFields.value.forEach((f) => {
		measurements[f.key] = ''
	})
	step.value = 4
}

function generatePattern() {
	const missing = measurementFields.value.filter((f) => !measurements[f.key]).map((f) => f.label)
	if (missing.length) {
		return
	}
	step.value = 5
}

function startOver() {
	step.value = 1
	garmentType.value = null
	selectedStyle.value = ''
	Object.keys(measurements).forEach((k) => delete measurements[k])
}

/** 5) save into pinia store */
function saveCreation() {
	if (!userStore.isLoggedIn) {
		return
	}
	userStore.addCreation({
		garmentType: garmentType.value as 'top' | 'bottom',
		style: selectedStyle.value,
		measurements: { ...measurements },
		images: resultImages.value,
	})
	startOver()
}

/** 6) export as PDF (unchanged) */
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
.header-image {
	@apply w-full h-[12vh] bg-cover bg-center
  bg-[url('/_BG_ART_LogIn_home_v2.jpg')]
  shadow-md shadow-gray-400;
}
.card {
	@apply mx-auto my-6 max-w-md bg-white p-6 rounded-lg shadow-lg;
}
.step-container {
	@apply flex flex-col items-start space-y-6;
}
.title {
	@apply text-black text-lg font-semibold text-left;
}
/* only used on step 4 */
.title--pink {
	@apply text-[#FF0066];
}
.option-list {
	@apply flex flex-col space-y-2 w-full;
}
.btn {
	@apply w-full bg-[#FF0066] text-white text-sm
  py-2 px-4 rounded-lg shadow-md shadow-gray-400
  transition ease-in-out text-center;
}
.btn:hover {
	@apply bg-pink-500;
}
.label {
	@apply text-sm font-medium text-gray-700 mb-1;
}
.input {
	@apply w-full border border-gray-300 rounded-md p-2
  focus:outline-none focus:ring-2 focus:ring-pink-400;
}
.instructions {
	@apply text-xxs text-black mt-4;
}
.instructions-title {
	@apply text-xs text-center font-bold mb-2;
}
.instruction-item {
	@apply mb-2;
}
.instruction-measure {
	@apply text-left font-bold;
}
.instruction-text {
	@apply text-left font-semibold;
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
