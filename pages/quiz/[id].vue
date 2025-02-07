<template>
	<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
		<div class="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg">
			<h1 class="text-3xl font-bold text-center mb-4">{{ quiz?.title }}</h1>

			<p v-if="!quiz" class="text-red-500">Quiz not found!</p>

			<div v-if="quiz">
				<div v-for="(question, index) in quiz.questions" :key="index" class="mb-4">
					<p class="font-semibold">{{ question.text }}</p>
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
				<button
					class="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
					@click="submitQuiz"
				>
					Submit Quiz
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router'

definePageMeta({
	layout: 'fullscreen', // Uses fullscreen layout instead of default
})

const route = useRoute()
const router = useRouter()
const quizId = route.params.id.toString() // Ensure it's a string

const quizzes = [
	{
		id: '0',
		title: 'How to Thread a Domestic/Manual Sewing Machine',
		questions: [
			{
				text: '1. What is the purpose of placing the thread on the spool pin at the start?',
				options: [
					'A. To prepare it for the bobbin winding process',
					'B. To hold the thread securely for threading',
					'C. To loop it directly around the needle',
					'D. To connect it to the tension regulator',
				],
			},
			{
				text: '2. What does the first thread guide do in the threading process?',
				options: [
					'A. Holds the thread firmly in place during sewing',
					'B. Directs the thread toward the tension regulator',
					'C. Loops the thread directly to the bobbin case',
					'D. Controls the thread tension automatically',
				],
			},
			{
				text: '3. Why is it important to loop the thread around the tension regulator?',
				options: [
					'A. To ensure the thread passes through the bobbin smoothly',
					'B. To create slack in the thread for easier threading',
					'C. To maintain proper thread tension during sewing',
					'D. To connect the thread directly to the bobbin compartment',
				],
			},
			{
				text: '4. After looping the thread around the tension regulator, what is the next\n' + 'step?',
				options: [
					'A. Pull the thread through the needle',
					'B. Pass the thread through the remaining guides near the needle',
					'C. Insert the thread directly into the bobbin case',
					'D. Place the thread back on the spool pin',
				],
			},
			{
				text: '5. What is the function of the slide plate?',
				options: [
					'A. To guide the thread into the needle',
					'B. To secure the thread spool in place',
					'C. To provide access to the bobbin compartment',
					'D. To control the thread tension',
				],
			},
			{
				text: '6. When placing the bobbin in the case, what should you do with the thread?',
				options: [
					'A. Leave it loose and un-threaded',
					'B. Pull it slowly, push it through the gap, and slide it around the metal to hold it in\n' +
						'place',
					'C. Tie a knot at the end to secure it',
					'D. Wind it around the spool pin',
				],
			},
			{
				text:
					'7. Why is it important to slide the bobbin thread around the metal inside the\n' + 'bobbin case?',
				options: [
					'A. To secure the bobbin in the compartment',
					'B. To ensure proper thread tension for stitching',
					'C. To connect the thread to the needle',
					'D. To lock the thread in the slide plate',
				],
			},
			{
				text: '8. Where should you place the bobbin case after preparing the bobbin?',
				options: [
					'A. In the tension regulator',
					'B. In the bobbin compartment',
					'C. In the first thread guide',
					'D. On the spool pin',
				],
			},
			{
				text: '9. What does turning the wheel towards you do during the final step?',
				options: [
					'A. Pulls the thread into the tension regulator',
					'B. Raises the needle and pulls the thread from the bobbin',
					'C. Locks the bobbin into the compartment',
					'D. Loops the thread through the remaining guides',
				],
			},
			{
				text: '10. Why is it critical to hold the tip of the thread during the final step?',
				options: [
					'A. To prevent the thread from slipping out of the guides',
					'B. To guide the thread into the tension regulator',
					'C. To ensure the needle pulls the thread from the bobbin correctly',
					'D. To secure the thread in the spool pin',
				],
			},
		],
	},
	{
		id: '1',
		title: 'Vue Basics',
		questions: [
			{ text: 'What is Vue?', options: ['A library', 'A framework', 'A database', 'A server'] },
			{
				text: 'What directive is used for conditional rendering?',
				options: ['v-show', 'v-if', 'v-bind', 'v-for'],
			},
		],
	},
]

const quiz = ref(quizzes.find((q) => q.id === quizId))
const answers = ref([])

const submitQuiz = () => {
	console.log('User answers:', answers.value)
	// alert('Quiz submitted!')
	router.push('/quizzes')
}
</script>
