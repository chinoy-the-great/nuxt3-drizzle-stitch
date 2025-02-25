<template>
	<div class="min-h-screen bg-nude-50 p-8">
		<h1 class="text-4xl font-bold text-center text-gray-800 mb-6">Profile</h1>

		<!-- Profile Picture Upload -->
		<div class="flex flex-col items-center mb-6">
			<div class="relative">
				<img
					:src="localProfilePicture"
					alt="Profile Picture"
					class="h-40 w-40 rounded-full border-4 border-gray-300 shadow-md object-cover"
				/>
				<label
					for="profilePicture"
					class="text-4xl absolute bottom-0 right-0 bg-transparent text-white p-2 rounded-full cursor-pointer transition"
				>
					📤
				</label>
			</div>
			<input id="profilePicture" type="file" class="hidden" @change="handleFileUpload" />
		</div>

		<!-- Form Fields -->
		<div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<label for="name" class="block text-gray-600 font-medium">Name</label>
				<input id="name" v-model="localName" class="input-field" placeholder="Enter your name" />
			</div>

			<div>
				<label for="fullName" class="block text-gray-600 font-medium">Full Name</label>
				<input id="fullName" v-model="localFullName" class="input-field" placeholder="Enter your full name" />
			</div>

			<div class="md:col-span-2">
				<label for="address" class="block text-gray-600 font-medium">Address</label>
				<input id="address" v-model="localAddress" class="input-field" placeholder="Enter your address" />
			</div>
		</div>

		<!-- Save Button -->
		<div class="max-w-3xl mx-auto mt-6">
			<button
				class="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition"
				@click="saveProfile"
			>
				Update Profile
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '~/stores/user'

definePageMeta({
	layout: 'fullscreen', // Uses fullscreen layout instead of default
})

const userStore = useUserStore()

// Local refs for temporary changes
const localName = ref('')
const localFullName = ref('')
const localAddress = ref('')
const localProfilePicture = ref('')

// Load userStore data into local refs when the component mounts
onMounted(() => {
	localName.value = userStore.name
	localFullName.value = userStore.fullName
	localAddress.value = userStore.address
	localProfilePicture.value = userStore.profilePicture
})

const handleFileUpload = (event: Event) => {
	const file = (event.target as HTMLInputElement).files?.[0]
	if (file) {
		const reader = new FileReader()
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				localProfilePicture.value = reader.result // Store only locally
			}
		}
		reader.readAsDataURL(file)
	}
}

const saveProfile = () => {
	// Update Pinia store only when "Save" is clicked
	userStore.updateProfile(localName.value, localFullName.value, localAddress.value, localProfilePicture.value)
}
</script>

<style scoped>
.input-field {
	@apply w-full p-3 border rounded-lg text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
