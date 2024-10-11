import { defineStore } from 'pinia'

interface User {
	username: string
	token: string
}

export const useUserStore = defineStore('user', {
	state: (): { user: User | null } => ({
		user: null, // Initially, no user is logged in
	}),
	actions: {
		setUser(userData: User) {
			this.user = userData
		},
		clearUser() {
			this.user = null
		},
	},
	getters: {
		isLoggedIn: (state) => !!state.user,
	},
})
