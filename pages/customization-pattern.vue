<template>
	<div>
		<!-- header image -->
		<div class="header-image"></div>

		<!-- main card -->
		<div class="card">
			<Transition name="fade" mode="out-in">
				<div :key="step" class="step-container">
					<!-- step title -->
					<h2 class="title" :class="{ 'title--pink': step === 4 }">
						{{ stepTitle }}
					</h2>

					<!-- step 1 -->
					<button v-if="step === 1" class="btn" @click="goToStep(2)">Start Customizing</button>

					<!-- step 2 -->
					<div v-else-if="step === 2" class="option-list">
						<button class="btn" @click="selectType('top')">Top</button>
						<button class="btn" @click="selectType('bottom')">Bottom</button>
					</div>

					<!-- step 3 -->
					<div v-else-if="step === 3" class="option-list">
						<button v-for="style in currentStyles" :key="style" class="btn" @click="selectStyle(style)">
							{{ style }}
						</button>
					</div>

					<!-- step 4: just the inputs + button -->
					<div v-else-if="step === 4" class="w-full space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<div v-for="field in measurementFields" :key="field.key" class="flex flex-col">
								<label class="label">{{ field.label }} ({{ field.unit }})</label>
								<input v-model="measurements[field.key]" type="number" class="input" />
							</div>
						</div>

						<button class="btn" @click="generatePattern">Generate Pattern</button>
					</div>
				</div>
			</Transition>
		</div>

		<!-- ORIGINAL instructions panel, now dynamic -->
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

// a reactive object that will hold whatever measurement‐keys the user needs:
const measurements = reactive<Record<string, string>>({})

// pull the array of style‐names for step 3
const currentStyles = computed<string[]>(() => {
	if (!garmentType.value) return []
	return customizationData[garmentType.value].styles
})

// pull the right measurement‐fields based on (garmentType, selectedStyle)
const measurementFields = computed<
	Array<{
		key: string
		label: string
		unit: string
		description: string
	}>
>(() => {
	if (!garmentType.value || !selectedStyle.value) return []
	const all = customizationData[garmentType.value].measurements
	// if there's a per‐style override, use it; otherwise default
	return all[selectedStyle.value] ?? all.default
})

// convenience titles
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

	// clear out any old measurements
	Object.keys(measurements).forEach((k) => {
		delete measurements[k]
	})

	// initialize the new fields
	measurementFields.value.forEach((f) => {
		measurements[f.key] = ''
	})

	step.value = 4
}

function generatePattern() {
	console.log('Generating with:', {
		type: garmentType.value,
		style: selectedStyle.value,
		measurements,
	})
	// … call your API or router.push …
}
</script>

<style lang="postcss">
.header-image {
	@apply w-full h-[12vh] bg-cover bg-center
  bg-[url('/_BG_ART_LogIn_home_v2.jpg')]
  shadow-md shadow-gray-400;
}
.card {
	@apply mx-auto mt-6 max-w-md bg-white p-6 rounded-lg shadow-lg;
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
