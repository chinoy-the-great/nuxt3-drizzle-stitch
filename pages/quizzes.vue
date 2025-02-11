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
				<!-- STITCH IN TIME Header (White font color) -->
				<h1 class="text-4xl font-bold text-center">STITCH IN TIME</h1>

				<!-- QUIZZES Header (Yellow font color) -->
				<h2 class="text-3xl font-bold text-center" style="color: #f5d670">QUIZZES</h2>
			</div>
		</div>

		<!-- Quizzes List -->
		<div v-for="(quiz, quizIndex) in quizzes" :key="quizIndex" class="mb-6">
			<!-- Quiz Item -->
			<NuxtLink :to="`/quiz/${quizIndex}`">
				<div
					class="p-4 rounded-xl shadow-md cursor-pointer w-full h-32 items-center"
					:style="{
						backgroundImage: 'url(/quiz_bg.png)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						minHeight: '120px' /* Adjust this to control the height */,
					}"
					@click="goToQuiz(quizIndex)"
				>
					<div class="flex flex-col justify-center items-center h-full text-center">
						<h2 class="text-2xl font-semibold text-white">{{ quiz.title }}</h2>
						<p class="text-sm text-gray-200 mt-2">{{ quiz.description }}</p>
					</div>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			quizzes: [
				{
					title: 'How to Thread a Domestic / Manual Sewing Machine',
					description:
						'This quiz is designed to\n' +
						'challenge your understanding of the process and test your ability to recall specific\n' +
						'details.',
					questions: [
						{
							question: 'What is 2 + 2?',
							options: ['3', '4', '5'],
							correctAnswer: '4',
						},
						{
							question: 'What is 3 + 5?',
							options: ['7', '8', '9'],
							correctAnswer: '8',
						},
					],
				},
				{
					title: 'Parts and Functions of Domestic/Manual Sewing Machine',
					description:
						'In this quiz, you will match each part of the sewing machine with its corresponding\n' +
						'function.',
					questions: [
						{
							question: 'Who was the first president of the United States?',
							options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson'],
							correctAnswer: 'George Washington',
						},
						{
							question: 'In which year did World War II end?',
							options: ['1942', '1945', '1950'],
							correctAnswer: '1945',
						},
					],
				},
			],
		}
	},
	methods: {
		goToQuiz(quizIndex) {
			// Navigate to the individual quiz view page
			this.$router.push({ path: `/quiz/${quizIndex}` })
		},
	},
}
</script>

<style scoped>
/* Add some custom styling */
.container {
	max-width: 800px;
}

h1 {
	color: #ffffff;
}

.bg-gray-100 {
	background-color: #f1f1f1;
}

.cursor-pointer:hover {
	background-color: #e5e5e5;
}

.text-lg {
	font-size: 1rem;
}

.text-xl {
	font-size: 1.25rem;
}

.text-green-500 {
	color: #38a169;
}

.text-red-500 {
	color: #e53e3e;
}
</style>
