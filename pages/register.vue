<template>
	<div
		class="flex flex-col items-center justify-center min-h-screen p-4"
		style="background-image: url('/landing_bg.png'); background-size: cover; background-position: center"
	>
		<form
			class="p-6 rounded-lg shadow-lg w-full max-w-sm"
			style="background-color: #461a1c"
			@submit.prevent="handleRegister"
		>
			<!-- Back arrow image in the upper left corner -->
			<router-link to="/login" class="absolute top-4 left-4">
				<img src="/register_back_arrow.png" alt="Back to Login" class="w-8 h-8" />
			</router-link>

			<h2 class="text-white font-mono font-extrabold text-3xl text-center">STITCH IN TIME</h2>
			<p class="text-center text-2xl mb-6" style="color: #b9445f">CREATE ACCOUNT</p>
			<div class="mb-4">
				<label for="username" class="block mb-1" style="color: #ddbdb4">Username</label>
				<input
					v-model="username"
					type="text"
					required
					class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
				/>
			</div>
			<div class="mb-4">
				<label for="email" class="block mb-1" style="color: #ddbdb4">Email</label>
				<input
					v-model="email"
					type="email"
					required
					class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
				/>
			</div>
			<div class="mb-4">
				<label for="password" class="block mb-1" style="color: #ddbdb4">Password</label>
				<input
					v-model="password"
					type="password"
					required
					class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
				/>
			</div>
			<div class="mb-4">
				<label for="repeat_password" class="block mb-1" style="color: #ddbdb4">Confirm Password</label>
				<input
					v-model="repeat_password"
					type="password"
					required
					class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
				/>
			</div>
			<button
				type="submit"
				class="w-full py-2 rounded transition duration-200 mt-8 mb-8"
				:disabled="isSubmitting"
				style="background-color: #b9445f; color: white"
				:hover="{ backgroundColor: '#99334D' }"
			>
				Sign up
			</button>

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

<style scoped>
form {
	position: relative; /* Ensure the form can position child elements absolutely */
}

.router-link {
	position: absolute;
	top: 16px;
	left: 16px;
	cursor: pointer;
}

.router-link img {
	width: 32px; /* Adjust size as needed */
	height: 32px;
}

.router-link:hover img {
	opacity: 0.8; /* Slight opacity change on hover for effect */
}
</style>
