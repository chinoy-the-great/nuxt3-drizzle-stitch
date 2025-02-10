<template>
	<div
		class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6"
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
	>
		<!-- Quiz Container -->
		<div class="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg relative">
			<!-- Quiz Title (Static) -->
			<h1 class="text-3xl font-bold text-center mb-4">{{ quiz?.title }}</h1>

			<!-- If Quiz is Not Found -->
			<p v-if="!quiz" class="text-red-500">Quiz not found!</p>

			<!-- Quiz Content -->
			<div v-if="quiz" class="relative w-full overflow-hidden">
				<!-- Questions Wrapper -->
				<div
					class="flex transition-transform duration-300 ease-in-out w-full"
					:style="{ transform: `translateX(-${currentQuestionIndex * 100}%)` }"
				>
					<!-- Single Question Slide -->
					<div
						v-for="(question, index) in quiz.questions"
						:key="index"
						class="w-full max-w-full flex-shrink-0 p-4"
					>
						<p class="font-semibold break-words text-wrap">{{ question.text }}</p>
						<ul>
							<li v-for="option in question.options" :key="option" class="mt-2">
								<label class="flex items-center gap-2 cursor-pointer">
									<input
										v-model="answers[index]"
										type="radio"
										:name="`question-${index}`"
										:value="option"
										class="accent-blue-500"
									/>
									{{ option }}
								</label>
							</li>
						</ul>
					</div>
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
	console.log('User answers:', answers.value)
	router.push('/quizzes') // Redirect after submission
}
</script>
