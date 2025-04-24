import { nanoid } from 'nanoid'
// stores/user.ts
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

/**── Interfaces ─────────────────────────────────────────**/
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

export interface PatternCreation {
	id: string
	garmentType: 'top' | 'bottom'
	style: string
	measurements: Record<string, string>
	images: { main: string; side: string }
	createdAt: string
}

/**── Store Definition ────────────────────────────────────**/
export const useUserStore = defineStore('user', () => {
	// ─── State ─────────────────────────────────────────────
	const user = ref<User | null>(null)
	const name = ref('John Doe')
	const fullName = ref('Johnathan Doe')
	const address = ref('123 Main St, City, Country')
	const profilePicture = ref('/Your_Account_Icon.png')
	const age = ref<number | null>(null)
	const email = ref('')

	const quizScores = ref<QuizScore[]>([])

	// “My Creations” state
	const creations = ref<PatternCreation[]>([])

	// ─── HYDRATE on client ─────────────────────────────────
	if (typeof window !== 'undefined') {
		// load user if stored
		const rawUser = window.localStorage.getItem('user')
		if (rawUser) {
			try {
				user.value = JSON.parse(rawUser)
			} catch {}
		}
		// load anonymous creations if any
		const rawCreations = window.localStorage.getItem('my_creations')
		if (rawCreations) {
			try {
				creations.value = JSON.parse(rawCreations)
			} catch {}
		}
	}

	// ─── WATCH user → persist & clear creations on login ───
	watch(
		user,
		(u) => {
			if (typeof window === 'undefined') return

			if (u) {
				// user just logged in
				window.localStorage.setItem('user', JSON.stringify(u))

				// clear any guest‐stored creations
				creations.value = []
				window.localStorage.removeItem('my_creations')
			} else {
				// user logged out
				window.localStorage.removeItem('user')
			}
		},
		{ immediate: true },
	)

	// ─── WATCH creations → persist anonymous creations ─────
	watch(
		creations,
		(list) => {
			if (typeof window === 'undefined') return
			// only store when there's no logged-in user
			if (!user.value) {
				window.localStorage.setItem('my_creations', JSON.stringify(list))
			}
		},
		{ deep: true },
	)

	// ─── Actions ───────────────────────────────────────────
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

	// ─── Getters ───────────────────────────────────────────
	const isLoggedIn = computed(() => !!user.value)

	return {
		// state
		user,
		name,
		fullName,
		address,
		profilePicture,
		age,
		email,
		quizScores,
		creations,

		// actions
		setUser,
		clearUser,
		updateProfile,
		storeQuizScore,
		addCreation,

		// getter
		isLoggedIn,
	}
})
