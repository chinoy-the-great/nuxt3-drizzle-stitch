<template>
	<div
		class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6"
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
	>
		<!-- Quiz Container For Multiple Choice -->
		<div v-if="quiz.type === 'multiple-choice'">
			<div class="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg relative">
				<!-- Quiz Title (Static) -->
				<h1 class="text-3xl font-bold text-center mb-4">{{ quiz?.title }}</h1>

				<!-- Directions -->
				<p class="text-sm text-gray-600 text-center">
					Directions: Threading a domestic/manual sewing machine requires careful attention to detail and
					proper handling of the thread and bobbin. This quiz is designed to challenge your understanding of
					the process and test your ability to recall specific details. Think carefully before answering each
					question!
				</p>

				<!-- If Quiz is Not Found -->
				<p v-if="!quiz" class="text-red-500">Quiz not found!</p>

				<!-- Quiz Content -->
				<div v-if="quiz" class="relative w-full overflow-hidden">
					<!-- Questions Wrapper -->
					<div class="relative w-full min-h-[300px] flex items-center">
						<!-- Single Question (Only One Visible at a Time) -->
						<transition name="fade" mode="out-in">
							<!-- Wrapper Div to Ensure a Single Child -->
							<div :key="currentQuestionIndex" class="w-full p-4 absolute">
								<p class="font-semibold">{{ quiz.questions[currentQuestionIndex].text }}</p>
								<ul>
									<li
										v-for="option in quiz.questions[currentQuestionIndex].options"
										:key="option"
										class="mt-2"
									>
										<label class="flex items-center gap-2 cursor-pointer">
											<input
												v-model="answers[currentQuestionIndex]"
												type="radio"
												:name="`question-${currentQuestionIndex}`"
												:value="option"
												class="accent-blue-500"
											/>
											{{ option }}
										</label>
									</li>
								</ul>
							</div>
						</transition>
					</div>
				</div>

				<!-- Navigation Buttons -->
				<div class="flex justify-between mt-4">
					<button
						:disabled="currentQuestionIndex === 0"
						class="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
						@click="prevQuestion"
					>
						⬅
					</button>
					<button
						:disabled="currentQuestionIndex === quiz.questions.length - 1"
						class="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
						@click="nextQuestion"
					>
						➡
					</button>
				</div>

				<!-- Submit Button -->
				<button
					v-if="currentQuestionIndex === quiz.questions.length - 1"
					class="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
					@click="submitQuiz"
				>
					Submit Quiz
				</button>
			</div>
		</div>

		<!-- Quiz Container For Matching-->
		<div v-if="quiz.type === 'matching'">
			<div class="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg">
				<h1 class="text-3xl font-bold text-center mb-2">{{ quiz?.title }}</h1>

				<!-- Directions -->
				<p class="text-sm text-gray-600 text-center mb-4">
					Directions: Welcome to the Sewing Machine Parts and Functions Matching Quiz! In this quiz, you will
					match each part of the sewing machine with its corresponding function.
				</p>

				<p v-if="!quiz" class="text-red-500">Quiz not found!</p>

				<div v-if="quiz">
					<div v-for="(question, index) in quiz.questions" :key="question.id" class="mb-4">
						<p class="font-semibold">{{ question.text }}</p>
						<select v-model="userAnswers[index]" class="w-full p-2 border rounded">
							<option disabled value="">Select an answer</option>
							<option v-for="answer in quiz.answers" :key="answer.id" :value="answer.id">
								{{ answer.text }}
							</option>
						</select>
					</div>

					<button
						class="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
						@click="submitQuiz"
					>
						Submit Quiz
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { quizzesData } from 'assets/quizzesData.js'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
	layout: 'fullscreen', // Uses fullscreen layout instead of default
})

const route = useRoute()
const router = useRouter()
const quizId = route.params.id.toString() // Ensure it's a string
const quiz = ref(quizzesData.find((q) => q.id === quizId))
const answers = ref([])
const currentQuestionIndex = ref(0)
const userAnswers = ref(Array.from({ length: quiz.value?.questions.length }).fill(''))

// Touch swipe handling
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (event) => {
	touchStartX.value = event.touches[0].clientX
}

const nextQuestion = () => {
	if (currentQuestionIndex.value < quiz.value.questions.length - 1) {
		currentQuestionIndex.value++
	}
}

const prevQuestion = () => {
	if (currentQuestionIndex.value > 0) {
		currentQuestionIndex.value--
	}
}

const checkSwipe = () => {
	const swipeThreshold = 50 // Minimum swipe distance

	// Swipe Left (Next Question)
	if (touchStartX.value - touchEndX.value > swipeThreshold) {
		nextQuestion()
	}

	// Swipe Right (Previous Question)
	if (touchEndX.value - touchStartX.value > swipeThreshold) {
		prevQuestion()
	}
}

const handleTouchEnd = (event) => {
	touchEndX.value = event.changedTouches[0].clientX
	checkSwipe()
}

const submitQuiz = () => {
	if (!quiz.value || !quiz.value.answerKey) {
		console.error('Quiz data or answer key is missing!')
		return
	}

	console.log('Quiz Title:', quiz.value.title)
	console.log('Quiz Type:', quiz.value.type)
	console.log('User Answers:', answers.value || userAnswers.value)
	console.log('Correct Answers:', quiz.value.answerKey)

	let score = 0
	const totalQuestions = quiz.value.questions.length

	if (quiz.value.type === 'multiple-choice') {
		quiz.value.answerKey.forEach((correctAnswer, index) => {
			if (String(answers.value[index] || '') === String(correctAnswer)) {
				score++
			} else {
				console.log(`❌ Question ${index + 1}: Expected "${correctAnswer}", Got "${answers.value[index]}"`)
			}
		})
	} else if (quiz.value.type === 'matching') {
		score = 0 // Reset score before checking

		quiz.value.answerKey.forEach((correctAnswer, index) => {
			// Find the selected answer text using the selected ID
			const selectedAnswerId = userAnswers.value[index]
			const selectedAnswerText =
				quiz.value.answers.find((answer) => answer.id === selectedAnswerId)?.text || ''

			if (String(selectedAnswerText) === String(correctAnswer)) {
				score++
			} else {
				console.log(`❌ Match ${index + 1}: Expected "${correctAnswer}", Got "${selectedAnswerText}"`)
			}
		})
	}

	// eslint-disable-next-line no-alert
	alert(`Your Score: ${score} / ${totalQuestions}`)
	router.push('/quizzes')
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease-in-out;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
