<template>
	<div
		class="flex flex-col items-center justify-center bg-transparent p-6"
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
	>
		<!-- Fixed Bottom Half Background with Overlay -->
		<div class="fixed bottom-0 left-0 w-full h-2/3 z-0">
			<div
				class="w-full h-full"
				style="
					background-image: url('/_BG_ART_LogIn_home_v2.jpg');
					background-size: cover;
					background-position: center bottom;
					background-repeat: no-repeat;
					opacity: 0.5;
				"
			></div>
		</div>

		<p class="text-sm font-bold text-center px-4">
			{{ quiz?.title }}
		</p>

		<p class="text-xxs text-center px-4 mb-4">
			{{ quiz?.directions }}
		</p>

		<!-- ──────────────────────────────────────────────────── -->
		<!-- MULTIPLE‐CHOICE QUIZ (hidden once showResults === true) -->
		<!-- ──────────────────────────────────────────────────── -->
		<div
			v-if="quiz.type === 'multiple-choice' && !showResults"
			class="relative w-full max-w-2xl min-h-[500px] bg-transparent shadow-lg rounded-lg flex flex-col border border-gray-200 overflow-hidden"
		>
			<!-- Upper Section -->
			<div class="bg-white px-6 py-4 border-b border-black mt-6">
				<p class="text-sm font-medium text-center mb-6">QUESTION NO. {{ currentQuestionIndex + 1 }}</p>
				<p class="text-sm text-center px-8 mb-6">
					{{ quiz.questions[currentQuestionIndex].text }}
				</p>
			</div>

			<!-- Lower Section (now has real height) -->
			<div class="bg-white/70 px-6 py-4 flex flex-col flex-1">
				<div class="relative w-full overflow-hidden flex-1">
					<transition name="fade" mode="out-in">
						<!-- pin it to the top of the wrapper so it’s never clipped -->
						<div :key="currentQuestionIndex" class="absolute inset-0 overflow-auto p-4">
							<ul class="flex flex-col items-center space-y-6">
								<li
									v-for="option in quiz.questions[currentQuestionIndex].options"
									:key="option"
									class="w-full flex justify-center"
								>
									<label
										class="flex items-center gap-2 cursor-pointer bg-white border border-black rounded-full px-4 py-2 text-xxs w-full max-w-[400px]"
									>
										<input
											v-model="answers[currentQuestionIndex]"
											type="radio"
											class="accent-[#65558f] w-4 h-4"
											:name="`question-${currentQuestionIndex}`"
											:value="option"
										/>
										{{ option }}
									</label>
								</li>
							</ul>
						</div>
					</transition>
				</div>

				<!-- Navigation Row -->
				<div class="flex justify-between mt-6">
					<button
						:disabled="currentQuestionIndex === 0"
						class="bg-white text-black px-8 py-1 rounded-full border border-black text-xxs font-semibold disabled:opacity-50"
						@click="prevQuestion"
					>
						Back
					</button>
					<button
						class="bg-[#65558f] text-white px-8 py-1 rounded-full text-xxs font-semibold disabled:opacity-50"
						@click="handleNextOrSubmit"
					>
						{{ nextLabel }}
					</button>
				</div>
			</div>
		</div>

		<!-- ──────────────────────────────────────────────────── -->
		<!-- MATCHING QUIZ (hidden once showResults === true) -->
		<!-- ──────────────────────────────────────────────────── -->
		<div v-if="quiz.type === 'matching' && !showResults">
			<div class="relative w-full max-w-2xl bg-white/70 p-6 shadow-lg rounded-lg border border-gray-200">
				<p v-if="!quiz" class="text-red-500">Quiz not found!</p>
				<div v-else>
					<div v-for="(question, index) in quiz.questions" :key="question.id" class="mb-4">
						<p class="font-semibold">{{ question.text }}</p>
						<select v-model="userAnswers[index]" class="w-full p-2 border rounded">
							<option disabled value="">Select an answer</option>
							<option v-for="answer in quiz.answers" :key="answer.id" :value="answer.id">
								{{ answer.text }}
							</option>
						</select>
					</div>

					<!-- You could replace this with a unified Next/Done,
               but this preserves your original matching Submit -->
					<button class="mt-6 w-full bg-[#65558f] text-white py-2 rounded-full" @click="submitQuiz">
						Done
					</button>
				</div>
			</div>
		</div>

		<!-- ──────────────────────────────────────────────────── -->
		<!-- RESULTS OVERLAY (shown once showResults === true) -->
		<!-- ──────────────────────────────────────────────────── -->
		<Teleport to="body">
			<div
				v-if="showResults"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
			>
				<div class="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
					<h2 class="text-2xl font-bold mb-4">Quiz Complete!</h2>
					<p class="text-lg mb-2">Your Score:</p>
					<p class="text-5xl font-extrabold mb-6">{{ score }} / {{ total }}</p>
					<button class="bg-[#65558f] hover:bg-purple-700 text-white px-6 py-2 rounded-full" @click="goBack">
						Back to Quizzes
					</button>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script setup>
import { useUserStore } from '@/stores/user' // ← adjust import path if needed
import { quizzesData } from 'assets/quizzesData.js'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
	layout: 'quizwindow',
})

// ROUTER & STORE
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// LOAD QUIZ
const quizId = String(route.params.id)
const quiz = ref(quizzesData.find((q) => q.id === quizId))

// STATE
const currentQuestionIndex = ref(0)
const answers = ref([]) // MCQ answers
const userAnswers = ref([]) // matching answers

// RESULTS STATE
const showResults = ref(false)
const score = ref(0)
const total = ref(0)

// INITIALIZE ANSWERS WHEN QUIZ LOADS
watch(
	() => quiz.value?.questions,
	(questions) => {
		if (!questions) return
		if (quiz.value.type === 'multiple-choice') {
			answers.value = Array.from({ length: questions.length }).fill(null)
			userAnswers.value = []
		} else {
			userAnswers.value = Array.from({ length: questions.length }).fill('')
			answers.value = []
		}
	},
	{ immediate: true },
)

// SWIPE HANDLING
const touchStartX = ref(0)

function handleTouchStart(e) {
	touchStartX.value = e.touches[0].clientX
}

function handleTouchEnd(e) {
	const dx = touchStartX.value - e.changedTouches[0].clientX
	if (dx > 50) handleNextOrSubmit()
	else if (dx < -50) prevQuestion()
}

// NAVIGATION HELPERS
function nextQuestion() {
	if (currentQuestionIndex.value < quiz.value.questions.length - 1) {
		currentQuestionIndex.value++
	}
}

function prevQuestion() {
	if (currentQuestionIndex.value > 0) {
		currentQuestionIndex.value--
	}
}

const isLast = computed(() => currentQuestionIndex.value === quiz.value.questions.length - 1)
const nextLabel = computed(() => (isLast.value ? 'Done' : 'Next'))

function handleNextOrSubmit() {
	if (isLast.value) submitQuiz()
	else nextQuestion()
}

// FINAL SUBMIT LOGIC (both MCQ & matching)
function submitQuiz() {
	if (!quiz.value?.answerKey) {
		console.error('Quiz data or answerKey missing')
		return
	}

	total.value = quiz.value.questions.length
	let s = 0

	if (quiz.value.type === 'multiple-choice') {
		quiz.value.answerKey.forEach((correct, i) => {
			if (String(answers.value[i] ?? '') === String(correct)) s++
		})
	} else {
		quiz.value.answerKey.forEach((correct, i) => {
			const selText = quiz.value.answers.find((a) => a.id === userAnswers.value[i])?.text || ''
			if (selText === correct) s++
		})
	}

	score.value = s

	// store score
	userStore.storeQuizScore(quiz.value.outerTitle, quiz.value.title, s, total.value)

	// reveal results overlay
	showResults.value = true
}

// go back to quizzes list
function goBack() {
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
