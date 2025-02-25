import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface User {
	username: string
	token: string
}

interface QuizScore {
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
	) => {
		name.value = newName
		fullName.value = newFullName
		address.value = newAddress
		profilePicture.value = newProfilePicture
	}

	// Store quiz score
	const storeQuizScore = (quizTitle: string, score: number, totalQuestions: number) => {
		const newScore: QuizScore = {
			quizTitle,
			score,
			totalQuestions,
			date: new Date().toLocaleString(), // Store timestamp
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
		quizScores,
		setUser,
		clearUser,
		updateProfile,
		storeQuizScore,
		isLoggedIn,
	}
})
