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
		<div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
			<div
				v-for="(score, index) in filteredScores"
				:key="index"
				class="flex bg-[#ffa5a5] shadow-md rounded-lg border border-gray-200 h-32"
			>
				<!-- Leftmost vertical gray bar with centered icon -->
				<div class="flex items-center justify-center w-20 bg-gray-100 h-full">
					<img src="/Toolbar_Quiz_Icon_Pink.png" alt="Quiz Icon" class="w-10 h-12" />
				</div>

				<!-- Achievement details -->
				<div class="flex-1 flex flex-col justify-between p-2">
					<!-- Top row: outerTitle and score -->
					<div class="flex justify-between items-start mr-2 ml-2 mt-1">
						<p class="text-black max-w-[50%]">
							<span class="font-semibold text-sm">{{ score.outerTitle }}</span>
							<br />
							<span class="text-xs block">{{ score.quizTitle }}</span>
						</p>
						<p class="text-black text-xs">Score: {{ score.score }} / {{ score.totalQuestions }}</p>
					</div>

					<!-- Bottom row: date -->
					<p class="text-xs text-black ml-2 mb-1">{{ formatDate(score.date) }}</p>
				</div>
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

// Define a method to format the date
const formatDate = (date: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	}
	return new Date(date).toLocaleString('en-US', options)
}
</script>
