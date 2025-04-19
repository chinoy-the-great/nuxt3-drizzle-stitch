<template>
	<div class="relative overflow-hidden">
		<!-- Fixed Bottom Half Background with Overlay -->
		<div class="fixed bottom-0 left-0 w-full h-1/2 z-0">
			<div
				class="w-full h-full"
				style="
					background-image: url('/_BG_ART_LogIn_home_v2.jpg');
					background-size: cover;
					background-position: center bottom;
					background-repeat: no-repeat;
					opacity: 0.3;
				"
			></div>
		</div>

		<!-- Main Content -->
		<div class="relative z-10 max-w-3xl mx-auto mb-24">
			<!-- Quizzes Label -->
			<div class="bg-[#ffa5a5] h-16 flex items-center justify-center mb-8">
				<h1 class="text-2xl font-semibold text-black">Quizzes</h1>
			</div>
			<!-- Quizzes List -->
			<div v-for="(quiz, quizIndex) in quizzes" :key="quizIndex" class="mb-6 px-8">
				<NuxtLink :to="`/quiz/${quizIndex}`">
					<div
						class="flex items-center bg-[#ffa5a5] rounded-xl w-full cursor-pointer overflow-hidden h-[70px] shadow-md shadow-gray-400 mb-4"
					>
						<!-- Thumbnail -->
						<div class="bg-gray-200 rounded-l-xl h-full w-20 flex items-center justify-center min-w-[80px]">
							<img src="/Toolbar_Quiz_Icon_Pink.png" alt="Quiz Icon" class="h-10 w-10 object-contain" />
						</div>

						<!-- Info + Action -->
						<div class="flex-1 flex items-center justify-between bg-[#ffa5a5] rounded-r-xl h-full px-4">
							<!-- Titles -->
							<div class="flex flex-col">
								<p class="text-xxs font-bold text-black">{{ quiz.outerTitle }}</p>
								<p class="text-xxs text-black">{{ quiz.title }}</p>
							</div>

							<!-- Start button -->
							<button class="bg-[#65558f] text-white text-xxs font-semibold px-4 py-1 rounded-full">
								Start
							</button>
						</div>
					</div>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
import { quizzesData } from 'assets/quizzesData.js'
import { ref } from 'vue'

const quizzes = ref(quizzesData)
</script>

<style scoped>
.cursor-pointer:hover {
	background-color: #e5e5e5;
}
</style>
