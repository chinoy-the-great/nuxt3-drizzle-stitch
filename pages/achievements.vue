<template>
	<div class="max-w-3xl mx-auto">
		<!-- Achievements Label -->
		<div class="bg-[#ffa5a5] h-16 flex items-center justify-center">
			<h1 class="text-2xl font-semibold text-black">Achievements</h1>
		</div>

		<!-- Header Tabs -->
		<div class="flex justify-around bg-gray-100 shadow-md border-b border-gray-300 mb-4">
			<div
				v-for="tab in tabs"
				:key="tab"
				class="relative py-2 cursor-pointer text-xs font-normal text-gray-700 w-full text-center"
				:class="{ 'font-bold text-black': selectedTab === tab }"
				@click="selectedTab = tab"
			>
				{{ tab }}
				<!-- Black underline if selected -->
				<div
					v-if="selectedTab === tab"
					class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-[2px] bg-black rounded-full"
				></div>
			</div>
		</div>

		<!-- No Quiz Scores -->
		<div v-if="filteredScores.length === 0" class="flex items-center justify-center h-20">
			<p class="text-gray-500 text-center">No quiz scores yet. Take a quiz to see your progress!</p>
		</div>

		<!-- Quiz Scores Grid -->
		<div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div
				v-for="(score, index) in filteredScores"
				:key="index"
				class="p-4 bg-white shadow-md rounded-lg border border-gray-200"
			>
				<h2 class="font-semibold text-lg text-blue-600">{{ score.quizTitle }}</h2>
				<p class="text-gray-700">
					Score:
					<span class="font-bold">{{ score.score }}</span>
					/ {{ score.totalQuestions }}
				</p>
				<p class="text-sm text-gray-500">{{ score.date }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { quizScores } = storeToRefs(userStore)

const tabs = ['Today', 'History']
const selectedTab = ref('Today')

const filteredScores = computed(() => {
	if (selectedTab.value === 'Today') {
		const today = new Date()
		const todayDateString = today.toISOString().split('T')[0] // Extracts 'YYYY-MM-DD'

		return quizScores.value.filter((score) => {
			const scoreDate = new Date(score.date)
			const scoreDateString = scoreDate.toISOString().split('T')[0]
			return scoreDateString === todayDateString
		})
	} else {
		// 'History' tab or other tabs
		return quizScores.value
	}
})
</script>
