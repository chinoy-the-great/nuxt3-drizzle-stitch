import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface User {
	username: string
	token: string
}

export const useUserStore = defineStore('user', () => {
	// User Authentication State
	const user = ref<User | null>(null)

	// Profile State
	const name = ref('John Doe')
	const profilePicture = ref('/Your_Account_Icon.png')

	// Actions
	const setUser = (userData: User) => {
		user.value = userData
	}

	const clearUser = () => {
		user.value = null
	}

	const updateProfile = (newName: string, newProfilePicture: string) => {
		name.value = newName
		profilePicture.value = newProfilePicture
	}

	// Getters
	const isLoggedIn = computed(() => !!user.value)

	return { user, name, profilePicture, setUser, clearUser, updateProfile, isLoggedIn }
})
