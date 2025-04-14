import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface User {
	username: string
	token: string
}

interface QuizScore {
	outerTitle: string
	quizTitle: string
	score: number
	totalQuestions: number
	date: string
}

export const useUserStore = defineStore('user', () => {
	// User Authentication State
	const user = ref<User | null>(null)

	// Profile State
	const name = ref('John Doe')
	const fullName = ref('Johnathan Doe')
	const address = ref('123 Main St, City, Country')
	const profilePicture = ref('/Your_Account_Icon.png')
	const age = ref<number | null>(null) // New Age field
	const email = ref('') // New Email field

	// Quiz Scores State
	const quizScores = ref<QuizScore[]>([])

	// Actions
	const setUser = (userData: User) => {
		user.value = userData
	}

	const clearUser = () => {
		user.value = null
	}

	const updateProfile = (
		newName: string,
		newFullName: string,
		newAddress: string,
		newProfilePicture: string,
		newAge: number | null, // Add newAge parameter
		newEmail: string, // Add newEmail parameter
	) => {
		name.value = newName
		fullName.value = newFullName
		address.value = newAddress
		profilePicture.value = newProfilePicture
		age.value = newAge // Update age
		email.value = newEmail // Update email
	}

	// Store quiz score
	const storeQuizScore = (outerTitle: string, quizTitle: string, score: number, totalQuestions: number) => {
		const newScore: QuizScore = {
			outerTitle,
			quizTitle,
			score,
			totalQuestions,
			date: new Date().toISOString(), // Store timestamp in ISO format
		}
		quizScores.value.push(newScore)
	}

	// Getters
	const isLoggedIn = computed(() => !!user.value)

	return {
		user,
		name,
		fullName,
		address,
		profilePicture,
		age, // Expose age
		email, // Expose email
		quizScores,
		setUser,
		clearUser,
		updateProfile,
		storeQuizScore,
		isLoggedIn,
	}
})
