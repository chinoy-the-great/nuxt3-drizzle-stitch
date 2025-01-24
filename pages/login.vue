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

			<div class="bg-[#461a1c] p-6 rounded-lg">
				<!-- Login Title -->
				<h2 class="text-3xl mb-6 text-center" style="color: #b9445f">LOG IN</h2>

				<!-- Login Form -->
				<form @submit.prevent="handleLogin">
					<div class="mb-4">
						<label for="username" class="block mb-1" style="color: #ddbdb4">Username:</label>
						<input
							v-model="username"
							type="text"
							placeholder="Enter Username/Email"
							required
							class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
						/>
					</div>
					<div class="mb-4">
						<label for="password" class="block mb-1" style="color: #ddbdb4">Password:</label>
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
						class="w-full py-2 rounded transition duration-200 mt-8 mb-8"
						style="background-color: #b9445f; color: white"
					>
						Log in
					</button>

					<p class="mt-4 text-center" style="color: #ddbdb4">New here? Go to</p>
					<p class="text-center">
						<NuxtLink to="/register" class="text-white hover:underline font-bold">Sign Up</NuxtLink>
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
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const username = ref<string>('')
const password = ref<string>('')

const router = useRouter()

const handleLogin = async () => {
	try {
		console.log('handle login')
		// Send a POST request to the backend with user credentials
		const { data, error } = await useFetch('/api/login', {
			method: 'POST',
			body: { username: username.value, password: password.value },
		})

		if (error.value) {
			console.error('Login failed:', error.value.message)
		} else {
			// Redirect to homepage or dashboard

			console.log('handle login', data)
			userStore.setUser({
				username: data.value.email,
			})

			console.log('user store: ', userStore)
			console.log('username: ', userStore.user?.username)

			await router.push('/home')
		}
	} catch (error) {
		console.error('An error occurred during login:', error)
	}
}
</script>
