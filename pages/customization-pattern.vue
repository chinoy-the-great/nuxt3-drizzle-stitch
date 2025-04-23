<template>
	<div>
		<!-- Header Image -->
		<div class="header-image"></div>

		<!-- Centered white card -->
		<div class="card">
			<Transition name="fade" mode="out-in">
				<div :key="step" class="flex flex-col items-start space-y-4">
					<!-- Title -->
					<h2 class="title">{{ stepTitle }}</h2>

					<!-- Step 1 -->
					<button v-if="step === 1" class="btn" @click="goToStep(2)">Start Customizing</button>

					<!-- Step 2 -->
					<div v-else-if="step === 2" class="option-list">
						<button class="btn" @click="selectType('top')">Top</button>
						<button class="btn" @click="selectType('bottom')">Bottom</button>
					</div>

					<!-- Step 3 -->
					<div v-else-if="step === 3" class="option-list">
						<button v-for="style in currentStyles" :key="style" class="btn" @click="selectStyle(style)">
							{{ style }}
						</button>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({
	layout: 'customizationwindow',
	title: 'Pattern Customization',
})

const step = ref(1)
const garmentType = ref<'top' | 'bottom' | ''>('')

const topStyles = ['T‑Shirt', 'Sando', 'Blouse', 'Polo Shirt', 'Crop Top']
const bottomStyles = ['Shorts', 'Pants', 'Skirt']

const stepTitle = computed(() => {
	if (step.value === 1) return 'Create Your Own Pattern'
	if (step.value === 2) return 'Select Garment Type'
	if (step.value === 3 && garmentType.value === 'top') return 'Select Top Style'
	if (step.value === 3 && garmentType.value === 'bottom') return 'Select Bottom Style'
	return ''
})

const currentStyles = computed(() => (garmentType.value === 'top' ? topStyles : bottomStyles))

function goToStep(n: number) {
	step.value = n
}

function selectType(type: 'top' | 'bottom') {
	garmentType.value = type
	step.value = 3
}

function selectStyle(style: string) {
	console.log('Chosen style:', style)
}
</script>

<style lang="postcss">
/* header background + sizing */
.header-image {
	@apply w-full h-[12vh]
  bg-cover bg-center
  bg-[url('/_BG_ART_LogIn_home_v2.jpg')]
  shadow-md shadow-gray-400;
}

/* white card around all steps */
.card {
	@apply mx-auto mt-6 max-w-md
  bg-white p-6
  rounded-lg shadow-lg;
}

/* reused button */
.btn {
	@apply w-full
  bg-[#FF0066] text-white text-sm
  py-2 px-4
  rounded-lg
  shadow-md shadow-gray-400
  transition ease-in-out;
}
.btn:hover {
	@apply bg-pink-500;
}

/* small tweaks for text title */
.title {
	@apply text-black text-lg font-semibold text-left;
}

/* wrapper for stacked buttons to get even spacing */
.option-list {
	@apply flex flex-col space-y-2 w-full;
}

/* simple fade in/out */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
