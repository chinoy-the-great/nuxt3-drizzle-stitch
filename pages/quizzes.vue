<!-- src/components/QuizList.vue -->
<template>
	<div class="max-w-2xl mx-auto p-6 bg-nude-50 rounded-lg shadow-lg">
		<h1 class="text-3xl font-extrabold text-nude-900 mb-6 text-center">Quizzes</h1>

		<!-- List of quizzes -->
		<ul class="space-y-4">
			<li
				v-for="(quiz, index) in quizzes"
				:key="index"
				class="border border-nude-300 p-4 rounded-lg bg-white flex justify-between items-center"
			>
				<div>
					<span class="text-lg font-semibold text-nude-700">{{ quiz.title }}</span>
					<p v-if="quiz.score !== null" class="text-nude-500">Score: {{ quiz.score }}%</p>
				</div>
				<button
					class="bg-nude-500 text-white px-4 py-2 rounded-lg hover:bg-nude-600"
					@click="startQuiz(index)"
				>
					Start Quiz
				</button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Quiz {
	title: string
	questions: { question: string; options: string[]; correctAnswer: number }[]
	score: number | null
}

// Sample quiz data
const quizzes = ref<Quiz[]>([
	{
		title: 'Sample Quiz 1',
		questions: [
			{ question: 'What is 2 + 2?', options: ['3', '4', '5'], correctAnswer: 1 },
			{
				question: 'What is the capital of France?',
				options: ['Berlin', 'Madrid', 'Paris'],
				correctAnswer: 2,
			},
		],
		score: null,
	},
	{
		title: 'Sample Quiz 2',
		questions: [
			{
				question: 'Which directive is used for rendering lists?',
				options: ['v-if', 'v-for', 'v-model'],
				correctAnswer: 1,
			},
			{
				question: 'What is Vue 3’s composition API?',
				options: ['set up', 'setup function', 'compose API'],
				correctAnswer: 1,
			},
		],
		score: null,
	},
])

// Start the quiz in a new window
const startQuiz = (quizIndex: number) => {
	// const selectedQuiz = quizzes.value[quizIndex]
	// const quizWindow = window.open(`/quiz/${quizIndex}`, '_blank', 'width=600,height=400')

	// Listen for a message from the quiz window (the final score)
	const receiveMessage = (event: MessageEvent) => {
		if (event.origin === window.location.origin) {
			const { score } = event.data
			if (typeof score === 'number') {
				quizzes.value[quizIndex].score = score
			}
			// Remove event listener when done
			window.removeEventListener('message', receiveMessage)
		}
	}

	// Add an event listener for the score message
	window.addEventListener('message', receiveMessage)
}
</script>

<style scoped>
/* No additional styles, Tailwind is being used */
</style>
