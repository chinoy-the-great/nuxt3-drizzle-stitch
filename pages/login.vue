<template>
	<div class="flex flex-col items-center justify-center min-h-screen bg-nude-50 p-4">
		<h2 class="text-nude-700 text-3xl mb-6">Login</h2>
		<form class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm" @submit.prevent="handleLogin">
			<div class="mb-4">
				<label for="username" class="block text-gray-700 mb-1">Username:</label>
				<input
					v-model="username"
					type="text"
					required
					class="w-full p-2 border border-nude-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring focus:ring-nude-500"
				/>
			</div>
			<div class="mb-4">
				<label for="password" class="block text-gray-700 mb-1">Password:</label>
				<input
					v-model="password"
					type="password"
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
			<p class="text-gray-600 mt-4">
				Don't have an account?
				<NuxtLink to="/register" class="text-nude-700 hover:underline">Register here</NuxtLink>
			</p>
		</form>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const username = ref<string>('')
const password = ref<string>('')

// const router = useRouter();

const handleLogin = async () => {
	try {
		console.log('Login successful')
		// await router.push('/'); // Redirect on success
	} catch (error) {
		console.error(error.message)
	}
}
</script>
