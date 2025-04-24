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
						<!-- big main image -->
						<img
							:src="resultImages.main"
							alt="Pattern result"
							class="w-full object-contain bg-white p-4 rounded-md"
							style="max-height: 40vh"
						/>

						<!-- two columns: measurements + side image -->
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
							<div>
								<img
									:src="resultImages.side"
									alt="Side view"
									class="w-full object-contain bg-white p-4 rounded-md"
									style="max-height: 40vh"
								/>
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
import { computed, reactive, ref } from 'vue'

definePageMeta({
	layout: 'customizationwindow',
	title: 'Pattern Customization',
})

const step = ref(1)
const garmentType = ref<'top' | 'bottom' | ''>('')
const selectedStyle = ref<string>('')

// dynamic measurements store
const measurements = reactive<Record<string, string>>({})

// styles for step 3
const currentStyles = computed<string[]>(() => {
	if (!garmentType.value) return []
	return customizationData[garmentType.value].styles
})

// which measurement fields to show
const measurementFields = computed(() => {
	if (!garmentType.value || !selectedStyle.value) return []
	const m = customizationData[garmentType.value].measurements
	return m[selectedStyle.value] ?? m.default
})

// images for step 5
const resultImages = computed(() => {
	if (!garmentType.value || !selectedStyle.value) {
		return { main: '', side: '' }
	}
	const imgs = customizationData[garmentType.value].images
	return imgs[selectedStyle.value] ?? imgs.default
})

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

function goToStep(n: number) {
	step.value = n
}

function selectType(type: 'top' | 'bottom') {
	garmentType.value = type
	step.value = 3
}

function selectStyle(style: string) {
	selectedStyle.value = style

	// reset old measurements
	Object.keys(measurements).forEach((k) => delete measurements[k])
	// init new keys
	measurementFields.value.forEach((f) => {
		measurements[f.key] = ''
	})

	step.value = 4
}

function generatePattern() {
	// ensure no blank fields
	const missing = measurementFields.value.filter((f) => !measurements[f.key]).map((f) => f.label)

	if (missing.length) {
		// enter error message function here
		return
	}

	// here you would call your API…
	// once successful, go to step 5
	step.value = 5
}

function saveCreation() {
	console.log('Save creation for:', {
		type: garmentType.value,
		style: selectedStyle.value,
		measurements,
	})
	// call your save‐creation API…
}

function startOver() {
	// reset everything
	step.value = 1
	garmentType.value = ''
	selectedStyle.value = ''
	Object.keys(measurements).forEach((k) => delete measurements[k])
}

const pdfContent = ref<HTMLElement | null>(null)

async function savePdf() {
	if (!pdfContent.value) return

	// 1) lazy‐load html2canvas
	const { default: html2canvas } = await import('html2canvas')
	// 2) rend­er, telling it to skip any `.no-pdf`
	const canvas = await html2canvas(pdfContent.value, {
		scale: window.devicePixelRatio,
		useCORS: true,
		backgroundColor: '#fff',
		ignoreElements: (el) => el.classList?.contains('no-pdf'),
	})

	// 3) build the PDF
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
