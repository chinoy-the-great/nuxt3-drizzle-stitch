<template>
	<div class="flex flex-col items-center justify-center min-h-screen bg-nude-50 p-4">
		<h2 class="text-nude-700 text-3xl mb-6">Register</h2>
		<form class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm" @submit.prevent="handleRegister">
			<div class="mb-4">
				<label for="username" class="block text-gray-700 mb-1">Username</label>
				<input
					v-model="username"
					type="text"
					required
					class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
				/>
			</div>
			<div class="mb-4">
				<label for="email" class="block text-gray-700 mb-1">Email</label>
				<input
					v-model="email"
					type="email"
					required
					class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
				/>
			</div>
			<div class="mb-4">
				<label for="password" class="block text-gray-700 mb-1">Password</label>
				<input
					v-model="password"
					type="password"
					required
					class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
				/>
			</div>
			<div class="mb-4">
				<label for="repeat_password" class="block text-gray-700 mb-1">Confirm Password</label>
				<input
					v-model="repeat_password"
					type="password"
					required
					class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
				/>
			</div>
			<button
				type="submit"
				class="w-full bg-nude-500 text-white py-2 rounded hover:bg-nude-600 transition duration-200"
				:disabled="isSubmitting"
			>
				Sign up
			</button>
			<p class="text-gray-600 mt-4">
				Already have an account?
				<router-link to="/login" class="text-nude-700 hover:underline">Login here</router-link>
			</p>

			<!-- Error message -->
			<p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
		</form>
	</div>
</template>

<script>
import axios from 'axios' // Import axios for API call

export default {
	data() {
		return {
			name: '',
			email: '',
			password: '',
			repeat_password: '',
			isSubmitting: false, // Disable the button while submitting
			errorMessage: '', // Handle error messages
		}
	},
	methods: {
		async handleRegister() {
			// Reset error message
			this.errorMessage = ''

			// Check if passwords match
			if (this.password !== this.repeat_password) {
				this.errorMessage = 'Passwords do not match in register.vue!'
				return
			}

			try {
				this.isSubmitting = true

				// Send registration request to the backend
				const response = await axios.post('/api/register', {
					name: this.username,
					email: this.email,
					password: this.password,
				})

				console.log('Received this:', response)
				// Registration successful, redirect to login
				this.$router.push('/login')
			} catch (error) {
				// Handle error and display an appropriate message
				this.errorMessage = error.response?.data?.message || 'An error occurred during registration.'
			} finally {
				this.isSubmitting = false
			}
		},
	},
}
</script>
