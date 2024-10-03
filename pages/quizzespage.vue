<!-- src/components/QuizPage.vue -->
<template>
	<div class="max-w-lg mx-auto p-6 bg-nude-50 rounded-lg shadow-lg">
		<h1 v-if="quiz" class="text-3xl font-extrabold text-nude-900 mb-6 text-center">{{ quiz.title }}</h1>

		<!-- Quiz questions -->
		<div v-for="(question, index) in quiz?.questions ?? {}" :key="index" class="mb-6">
			<h2 class="text-lg font-semibold text-nude-700">{{ question.question }}</h2>
			<ul class="space-y-2">
				<li
					v-for="(option, optIndex) in question.options"
					:key="optIndex"
					class="border p-3 rounded-lg bg-white cursor-pointer hover:bg-nude-100"
					:class="{ 'bg-nude-300': selectedAnswers[index] === optIndex }"
					@click="selectAnswer(index, optIndex)"
				>
					{{ option }}
				</li>
			</ul>
		</div>

		<!-- Submit Quiz Button -->
		<button class="mt-6 w-full bg-nude-500 text-white py-2 rounded-lg hover:bg-nude-600" @click="submitQuiz">
			Submit Quiz
		</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

interface Question {
	question: string
	options: string[]
	correctAnswer: number
}

interface Quiz {
	title: string
	questions: Question[]
}

const route = useRoute()
const quizIndex = Number.parseInt(route.params.quizIndex, 10)

// Load quiz data based on index
const quizData = [
	{
		title: 'Basic JavaScript Quiz',
		questions: [
			{ question: 'What is 2 + 2?', options: ['3', '4', '5'], correctAnswer: 1 },
			{
				question: 'What is the capital of France?',
				options: ['Berlin', 'Madrid', 'Paris'],
				correctAnswer: 2,
			},
		],
	},
	{
		title: 'Vue.js Quiz',
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
	},
]

const quiz = ref<Quiz>(quizData[quizIndex])
const selectedAnswers = ref<number[]>([])

// Select an answer for a question
const selectAnswer = (questionIndex: number, optionIndex: number) => {
	selectedAnswers.value[questionIndex] = optionIndex
}

// Calculate score and send back to parent window
const submitQuiz = () => {
	const totalQuestions = quiz.value.questions.length
	const correctAnswers = quiz.value.questions.reduce((score, question, index) => {
		return score + (selectedAnswers.value[index] === question.correctAnswer ? 1 : 0)
	}, 0)
	const score = (correctAnswers / totalQuestions) * 100

	// Send the score back to the parent window
	window.opener.postMessage({ score }, window.location.origin)
	window.close()
}
</script>

<style scoped>
/* No additional styles, Tailwind is being used */
</style>
