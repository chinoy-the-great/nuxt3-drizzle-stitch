import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

/** Authentication payload */
interface User {
	username: string
	token: string
}

/** Quiz score structure */
interface QuizScore {
	outerTitle: string
	quizTitle: string
	score: number
	totalQuestions: number
	date: string
}

/** A saved pattern (“creation”) */
export interface PatternCreation {
	id: string
	garmentType: 'top' | 'bottom'
	style: string
	measurements: Record<string, string>
	images: { main: string; side: string }
	createdAt: string
}

export const useUserStore = defineStore('user', () => {
	// ─── User / Profile State ───────────────────────────
	const user = ref<User | null>(null)
	const name = ref('John Doe')
	const fullName = ref('Johnathan Doe')
	const address = ref('123 Main St, City, Country')
	const profilePicture = ref('/Your_Account_Icon.png')
	const age = ref<number | null>(null)
	const email = ref('')

	// ─── Quiz Scores ─────────────────────────────────────
	const quizScores = ref<QuizScore[]>([])

	// ─── Persisted “My Creations” ────────────────────────
	const creations = ref<PatternCreation[]>([])

	// Hydrate from localStorage (only in browser)
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('my_creations')
		if (saved) {
			try {
				creations.value = JSON.parse(saved)
			} catch (e) {
				console.warn('Failed to parse saved creations:', e)
			}
		}
	}

	// Persist any changes back to localStorage
	watch(
		creations,
		(newList) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('my_creations', JSON.stringify(newList))
			}
		},
		{ deep: true },
	)

	// ─── Actions ─────────────────────────────────────────
	function setUser(userData: User) {
		user.value = userData
	}

	function clearUser() {
		user.value = null
	}

	function updateProfile(
		newName: string,
		newFullName: string,
		newAddress: string,
		newProfilePicture: string,
		newAge: number | null,
		newEmail: string,
	) {
		name.value = newName
		fullName.value = newFullName
		address.value = newAddress
		profilePicture.value = newProfilePicture
		age.value = newAge
		email.value = newEmail
	}

	function storeQuizScore(outerTitle: string, quizTitle: string, score: number, totalQuestions: number) {
		quizScores.value.push({
			outerTitle,
			quizTitle,
			score,
			totalQuestions,
			date: new Date().toISOString(),
		})
	}

	/**
	 * Add a new pattern to the user’s creations list.
	 * Generates a unique `id` + timestamp automatically.
	 */
	function addCreation(payload: {
		garmentType: 'top' | 'bottom'
		style: string
		measurements: Record<string, string>
		images: { main: string; side: string }
	}) {
		creations.value.push({
			id: nanoid(),
			createdAt: new Date().toISOString(),
			...payload,
		})
	}

	// ─── Getters ─────────────────────────────────────────
	const isLoggedIn = computed(() => !!user.value)

	return {
		// Auth & profile
		user,
		name,
		fullName,
		address,
		profilePicture,
		age,
		email,
		setUser,
		clearUser,
		updateProfile,

		// Quiz
		quizScores,
		storeQuizScore,

		// Creations
		creations,
		addCreation,

		// Getters
		isLoggedIn,
	}
})
