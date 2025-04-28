<template>
	<div class="relative flex flex-col items-center justify-center min-h-screen bg-white p-6">
		<!-- Back Button -->
		<button
			class="absolute top-4 left-4 text-white bg-[#ff0066] w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
			@click="goBack"
		>
			<i class="fas fa-angle-left text-lg text-white"></i>
		</button>

		<!-- Image -->
		<img
			src="/STITCH IN TIME LOGO.png"
			alt="Welcome Image"
			class="w-60 h-60 object-contain rounded-lg mb-4"
		/>

		<h1 class="text-3xl text-black text-center font-bold">WELCOME BACK</h1>

		<!-- Login Title -->
		<h2 class="text-sm text-black mb-6 text-center">SIGN IN</h2>

		<!-- Login Form -->
		<form class="w-4/5 max-w-lg z-10" @submit.prevent="handleLogin">
			<!-- Username Input -->
			<div class="mb-4 relative">
				<input
					v-model="username"
					type="text"
					placeholder="Email or Username"
					required
					class="w-full p-3 pr-10 text-sm rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<!-- User Icon -->
				<i class="fas fa-user absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
			</div>

			<!-- Password Input -->
			<div class="mb-4 relative">
				<input
					v-model="password"
					type="password"
					placeholder="Password"
					required
					class="w-full p-3 pr-10 text-sm rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<!-- Lock Icon -->
				<i class="fas fa-eye absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
			</div>

			<!-- Sign In Button -->
			<button
				type="submit"
				class="w-full py-3 rounded-full transition duration-200 mt-8 mb-4 shadow-lg"
				style="background-color: #65558f; color: white"
			>
				SIGN IN
			</button>

			<!-- Sign Up Link -->
			<p class="text-center text-white">
				Don't have an account?
				<NuxtLink to="/register" class="font-bold hover:underline" style="color: #ff0066">
					Create one now!
				</NuxtLink>
			</p>
		</form>

		<!-- Background Footer Image -->
		<div
			class="absolute bottom-0 w-full h-1/3 bg-cover bg-no-repeat bg-center"
			style="background-image: url('/Group 109.png')"
		></div>
	</div>
</template>

<script lang="ts" setup>
import { useFetch } from '#app'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

definePageMeta({
	layout: 'welcome',
})

const userStore = useUserStore()

const username = ref<string>('')
const password = ref<string>('')

const router = useRouter()

const goBack = () => {
	router.push('/welcome') // Redirects to the welcome page
}

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
