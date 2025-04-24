<template>
	<div>
		<!-- same header image + spacing as your other page -->
		<div class="header-image mb-8"></div>

		<!-- the white “card” wrapper -->
		<div class="card">
			<!-- Title changes depending on list vs detail -->
			<h2 class="text-[#FF0066] text-lg font-semibold mb-4">
				{{ selectedCreation ? selectedCreation.style : 'Your Saved Creations' }}
			</h2>

			<Transition name="fade" mode="out-in">
				<!-- ─────────── LIST VIEW ─────────── -->
				<div v-if="!selectedCreation" key="list" class="grid grid-cols-1 gap-4">
					<div
						v-for="item in creations"
						:key="item.id"
						class="cursor-pointer hover:opacity-90 rounded-md overflow-hidden shadow"
						@click="selectCreation(item)"
					>
						<img
							:src="item.images.main"
							alt="Saved Creation"
							class="w-full max-h-32 object-contain bg-white p-2"
						/>
					</div>
				</div>

				<!-- ───────── DETAIL VIEW (no buttons) ─────── -->
				<div v-else key="detail" class="space-y-6">
					<button class="text-[#FF0066] hover:underline" @click="goBack">← Back to Gallery</button>

					<!-- big main image -->
					<img
						:src="selectedCreation.images.main"
						alt="Pattern result"
						class="w-full object-contain bg-white p-4 rounded-md"
						style="max-height: 40vh"
					/>

					<!-- two columns: measurements + side image -->
					<div class="grid grid-cols-2 gap-4">
						<div>
							<h3 class="font-semibold mb-2">Your Measurements</h3>
							<ul class="list-disc pl-5 space-y-1 text-sm">
								<li v-for="(value, key) in selectedCreation.measurements" :key="key">
									<strong>{{ getLabel(key) }}:</strong>
									{{ value }}
								</li>
							</ul>
						</div>
						<div>
							<img
								:src="selectedCreation.images.side"
								alt="Side view"
								class="w-full object-contain bg-white p-4 rounded-md"
								style="max-height: 40vh"
							/>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
// your central customization data
import { measurementDefinitions } from '@/assets/measurementDefinitions.js'
// Pinia store & types
import { computed, ref } from 'vue'
import { PatternCreation, useUserStore } from '~/stores/user'

definePageMeta({
	layout: 'customizationwindow',
	title: 'My Creation',
})

const userStore = useUserStore()

// reactive list of saved creations
const creations = computed<PatternCreation[]>(() => userStore.creations)

// which one is “open” in detail view?
const selectedCreation = ref<PatternCreation | null>(null)

function selectCreation(item: PatternCreation) {
	selectedCreation.value = item
}
function goBack() {
	selectedCreation.value = null
}

// helper to look up field labels by key
function getLabel(key: string): string {
	const fromMaster = measurementDefinitions.find((m) => m.key === key)
	return fromMaster.label ?? key
}
</script>

<style lang="postcss">
.header-image {
	@apply w-full h-[12vh] bg-cover bg-center shadow-md shadow-gray-400;
	/* replicate your background */
	background-image: url('/_BG_ART_LogIn_home_v2.jpg');
}
.card {
	@apply mx-auto my-6 max-w-md bg-white p-6 rounded-lg shadow-lg;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
