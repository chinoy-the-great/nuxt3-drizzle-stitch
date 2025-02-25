<template>
	<div class="max-w-3xl mx-auto mt-8 p-6">
		<h1 class="text-2xl font-semibold mb-4">Achievements</h1>

		<!-- No Quiz Scores -->
		<p v-if="quizScores.length === 0" class="text-gray-500">
			No quiz scores yet. Take a quiz to see your progress!
		</p>

		<!-- Quiz Scores Grid -->
		<div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div
				v-for="(score, index) in quizScores"
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
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { quizScores } = storeToRefs(userStore)
</script>
