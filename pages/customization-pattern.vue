<template>
	<div>
		<div class="header-image"></div>
		<div class="card">
			<Transition name="fade" mode="out-in">
				<div :key="step" class="step-container">
					<!-- existing steps… -->
					<h2 class="title" :class="{ 'title--pink': step === 4 }">
						{{ stepTitle }}
					</h2>

					<button v-if="step === 1" class="btn" @click="goToStep(2)">Start Customizing</button>

					<div v-else-if="step === 2" class="option-list">
						<button class="btn" @click="selectType('top')">Top</button>
						<button class="btn" @click="selectType('bottom')">Bottom</button>
					</div>

					<div v-else-if="step === 3" class="option-list">
						<button v-for="style in currentStyles" :key="style" class="btn" @click="selectStyle(style)">
							{{ style }}
						</button>
					</div>

					<!-- NEW Step 4: Enter Your Measurements -->
					<div v-else-if="step === 4" class="w-full space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<div class="flex flex-col">
								<label class="label">Bust (in inches)</label>
								<input v-model="measurements.bust" type="number" class="input" />
							</div>
							<div class="flex flex-col">
								<label class="label">Armhole (in inches)</label>
								<input v-model="measurements.armhole" type="number" class="input" />
							</div>
							<div class="flex flex-col">
								<label class="label">Underbust (in inches)</label>
								<input v-model="measurements.underbust" type="number" class="input" />
							</div>
							<div class="flex flex-col">
								<label class="label">Sleeve Length (in inches)</label>
								<input v-model="measurements.sleeveLength" type="number" class="input" />
							</div>
							<div class="flex flex-col">
								<label class="label">Shoulder Width (in inches)</label>
								<input v-model="measurements.shoulderWidth" type="number" class="input" />
							</div>
							<div class="flex flex-col">
								<label class="label">Neckline (in inches)</label>
								<input v-model="measurements.neckline" type="number" class="input" />
							</div>
						</div>

						<button class="btn" @click="generatePattern">Generate Pattern</button>
					</div>
				</div>
			</Transition>
		</div>

		<div v-if="step === 4" class="instructions px-8 pb-8">
			<h3 class="instructions-title">Instructions:</h3>

			<div v-for="item in measurementInstructions" :key="item.label" class="instruction-item">
				<p class="instruction-measure">{{ item.label }}</p>
				<p class="instruction-text">How To Measure: {{ item.description }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

definePageMeta({ layout: 'customizationwindow', title: 'Pattern Customization' })

const step = ref(1)
const garmentType = ref<'top' | 'bottom' | ''>('')
const selectedStyle = ref('')
const topStyles = ['T‑Shirt', 'Sando', 'Blouse', 'Polo Shirt', 'Crop Top']
const bottomStyles = ['Shorts', 'Pants', 'Skirt']

const measurementInstructions = [
	{
		label: 'Bust',
		description: 'Around the fullest part of your bust, keeping the tape comfortable snug but not tight.',
	},
	{
		label: 'Armhole',
		description: 'Directly under your bust, where the band of your bra sits.',
	},
	{
		label: 'Underbust',
		description: 'Around the shoulder and under the arm, keeping the tape snug but comfortable.',
	},
	{
		label: 'Sleeve Length',
		description: 'From the top of the shoulder to the wrist along the outside of your arm.',
	},
	{
		label: 'Shoulder Width',
		description: 'From the shoulder (at the neck) to the desired length (waist, hips, or lower).',
	},
	{
		label: 'Neckline',
		description: 'Around the base of your neck, where the collar or neckline sits.',
	},
]

// new reactive measurements object
const measurements = reactive({
	bust: '',
	armhole: '',
	underbust: '',
	sleeveLength: '',
	shoulderWidth: '',
	neckline: '',
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
		default:
			return ''
	}
})

const currentStyles = computed(() => (garmentType.value === 'top' ? topStyles : bottomStyles))

function goToStep(n: number) {
	step.value = n
}
function selectType(type: 'top' | 'bottom') {
	garmentType.value = type
	step.value = 3
}
// now we advance to step 4 on style selection
function selectStyle(style: string) {
	selectedStyle.value = style
	step.value = 4
}
function generatePattern() {
	console.log('🚀 generate with', {
		type: garmentType.value,
		style: selectedStyle.value,
		measurements,
	})
	// …your API call or router push…
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
