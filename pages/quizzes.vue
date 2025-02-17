<template>
	<div
		class="container mx-auto p-6"
		style="
			background-image: url('/quiz_page_bg.png');
			background-size: cover;
			background-position: center;
			min-height: 100vh;
		"
	>
		<div class="flex justify-center mt-8">
			<div class="bg-[#391917] p-6 rounded-lg mb-8 inline-block">
				<h1 class="text-4xl font-bold text-center text-white">STITCH IN TIME</h1>
				<h2 class="text-3xl font-bold text-center" style="color: #f5d670">QUIZZES</h2>
			</div>
		</div>

		<!-- Quizzes List -->
		<div v-for="(quiz, quizIndex) in quizzes" :key="quizIndex" class="mb-6">
			<NuxtLink :to="`/quiz/${quizIndex}`">
				<div
					class="p-4 rounded-xl shadow-md cursor-pointer w-full h-32 items-center"
					:style="{
						backgroundImage: 'url(/quiz_bg.png)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						minHeight: '120px',
					}"
					@click="goToQuiz(quizIndex)"
				>
					<div class="flex flex-col justify-center items-center h-full text-center">
						<h2 class="text-2xl font-semibold text-white">{{ quiz.outerTitle }}</h2>
						<p class="text-sm text-gray-200 mt-2">{{ quiz.description }}</p>
					</div>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
import { quizzesData } from 'assets/quizzesData.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const quizzes = ref(quizzesData)

const goToQuiz = (quizIndex) => {
	router.push({ path: `/quiz/${quizIndex}` })
}
</script>

<style scoped>
.container {
	max-width: 800px;
}

.cursor-pointer:hover {
	background-color: #e5e5e5;
}
</style>
