<template>
	<div class="relative flex flex-col items-center justify-center min-h-screen bg-white p-6">
		<!-- Back Button -->
		<button
			class="absolute top-4 left-4 text-white bg-[#ff0066] w-10 h-10 flex items-center justify-center rounded-full shadow-lg"
			@click="goBack"
		>
			<i class="fas fa-angle-left text-lg text-white"></i>
		</button>

		<!-- Logo -->
		<img
			src="/STITCH IN TIME LOGO.png"
			alt="Welcome Image"
			class="w-60 h-60 object-contain rounded-lg mb-4 mt-8"
		/>

		<h1 class="text-3xl text-black text-center font-bold">LET'S GET STARTED</h1>
		<h2 class="text-sm text-black mb-6 text-center">SIGN UP</h2>

		<!-- Register Form -->
		<form class="w-4/5 max-w-lg z-10" @submit.prevent="handleRegister">
			<!-- Username -->
			<div class="mb-4 relative">
				<input
					v-model="username"
					type="text"
					placeholder="Username"
					required
					class="w-full p-3 pr-10 text-sm rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<i class="fas fa-user absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
			</div>

			<!-- Email -->
			<div class="mb-4 relative">
				<input
					v-model="email"
					type="email"
					placeholder="Email"
					required
					class="w-full p-3 pr-10 text-sm rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<i class="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
			</div>

			<!-- Password -->
			<div class="mb-4 relative">
				<input
					v-model="password"
					:type="showPassword ? 'text' : 'password'"
					placeholder="Password"
					required
					class="w-full p-3 pr-10 text-sm rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<i
					class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
					:class="[showPassword ? 'fas fa-eye-slash' : 'fas fa-eye']"
					@click="toggleShowPassword"
				></i>
			</div>

			<!-- Confirm Password -->
			<div class="mb-4 relative">
				<input
					v-model="repeat_password"
					:type="showRepeatPassword ? 'text' : 'password'"
					placeholder="Confirm Password"
					required
					class="w-full p-3 pr-10 text-sm rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<i
					class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
					:class="[showRepeatPassword ? 'fas fa-eye-slash' : 'fas fa-eye']"
					@click="toggleShowRepeatPassword"
				></i>
			</div>

			<!-- Sign Up Button -->
			<button
				type="submit"
				class="w-full py-3 rounded-full transition duration-200 mt-8 mb-4 shadow-lg"
				style="background-color: #65558f; color: white"
			>
				SIGN UP
			</button>

			<!-- Login Link -->
			<p class="text-center text-white">
				Already have an account?
				<NuxtLink to="/login" class="font-bold hover:underline" style="color: #ff0066">Log in</NuxtLink>
			</p>
		</form>

		<!-- Background Footer Image -->
		<div
			class="absolute bottom-0 w-full h-1/3 bg-cover bg-no-repeat bg-center"
			style="background-image: url('/Group 109.png')"
		></div>
	</div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
	layout: 'welcome',
})

const router = useRouter()

// form fields
const username = ref('')
const email = ref('')
const password = ref('')
const repeat_password = ref('')

// visibility toggles
const showPassword = ref(false)
const showRepeatPassword = ref(false)

// submission state
const isSubmitting = ref(false)
const errorMessage = ref('')

// back button
const goBack = () => {
	router.push('/welcome')
}

// toggle functions
const toggleShowPassword = () => {
	showPassword.value = !showPassword.value
}
const toggleShowRepeatPassword = () => {
	showRepeatPassword.value = !showRepeatPassword.value
}

// handle register
const handleRegister = async () => {
	errorMessage.value = ''
	if (password.value !== repeat_password.value) {
		errorMessage.value = 'Passwords do not match!'
		return
	}

	try {
		isSubmitting.value = true
		const response = await axios.post('/api/register', {
			name: username.value,
			email: email.value,
			password: password.value,
		})
		console.log('Received this:', response)
		router.push('/login')
	} catch (err) {
		errorMessage.value = err.response?.data?.message || 'An error occurred during registration.'
	} finally {
		isSubmitting.value = false
	}
}
</script>

<style scoped>
/* (You can remove or adjust these if you’re using Tailwind everywhere) */
form {
	position: relative;
}
</style>
