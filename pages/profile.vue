<template>
	<div class="container mx-auto p-6">
		<h1 class="text-2xl font-bold mb-4 mt-8">Profile</h1>
		<div class="flex flex-col items-center">
			<!-- Profile Picture -->
			<img :src="userStore.profilePicture" alt="Profile Picture" class="h-32 w-32 rounded-full mb-4" />
			<input type="file" class="mb-4" @change="handleFileUpload" />

			<!-- Name Input -->
			<input v-model="userStore.name" class="border p-2 rounded w-64" placeholder="Enter your name" />

			<!-- Save Button -->
			<button class="bg-blue-500 text-white px-4 py-2 rounded mt-4" @click="saveProfile">Save</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const handleFileUpload = (event: Event) => {
	const file = (event.target as HTMLInputElement).files?.[0]
	if (file) {
		const reader = new FileReader()
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				userStore.profilePicture = reader.result
			}
		}
		reader.readAsDataURL(file)
	}
}

const saveProfile = () => {
	// Profile data is already reactive and updates automatically in Pinia.
	// alert('Profile updated!')
}
</script>
