<template>
	<div class="flex flex-col items-center justify-center min-h-screen bg-nude-50 p-4">
		<!-- Container for Image and Form -->
		<div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
			<!-- Header Image -->
			<img
				src="/_BG_ART_LogIn_alt.jpg"
				alt="Login Header"
				class="w-full h-72 object-contain rounded-t-lg mb-6"
			/>

			<div class="">
				<!-- Login Title -->
				<h2 class="font-serif text-nude-700 text-3xl mb-6 text-center">LOG IN</h2>

				<!-- Login Form -->
				<form @submit.prevent="handleLogin">
					<div class="mb-4">
						<label for="username" class="block text-gray-700 mb-1">Username:</label>
						<input
							v-model="username"
							type="text"
							placeholder="Enter Username/Email"
							required
							class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
						/>
					</div>
					<div class="mb-4">
						<label for="password" class="block text-gray-700 mb-1">Password:</label>
						<input
							v-model="password"
							type="password"
							placeholder="Enter Password"
							required
							class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
						/>
					</div>
					<button
						type="submit"
						class="w-full bg-nude-500 text-white py-2 rounded hover:bg-nude-600 transition duration-200"
					>
						Login
					</button>
					<p class="text-gray-600 mt-4 text-center">New here? Go to</p>
					<p class="text-center">
						<NuxtLink to="/register" class="text-nude-700 hover:underline">Sign Up</NuxtLink>
					</p>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useFetch } from '#app'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref<string>('')
const password = ref<string>('')

const router = useRouter()

const handleLogin = async () => {
	try {
		// Send a POST request to the backend with user credentials
		const { data, error } = await useFetch('/api/auth/login', {
			method: 'POST',
			body: { username: username.value, password: password.value },
		})

		if (error.value) {
			console.error('Login failed:', error.value.message)
		} else {
			console.log('Login successful', data)
			// Redirect to homepage or dashboard
			await router.push('/')
		}
	} catch (error) {
		console.error('An error occurred during login:', error)
	}
}
</script>
