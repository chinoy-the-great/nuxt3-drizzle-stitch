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
			>
				Sign up
			</button>
			<p class="text-gray-600 mt-4">
				Already have an account?
				<router-link to="/login" class="text-nude-700 hover:underline">Login here</router-link>
			</p>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			email: '',
			password: '',
			repeat_password: '',
		}
	},
	methods: {
		handleRegister() {
			// Handle registration logic (e.g., API call to create user)
			console.log('Registering:', this.username, this.password)
		},
	},
}
</script>
