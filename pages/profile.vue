<template>
	<div class="min-h-screen bg-white p-8">
		<!-- Profile Picture Upload -->
		<div class="flex flex-col items-center mt-8 mb-6">
			<div class="relative">
				<img
					:src="localProfilePicture"
					alt="Profile Picture"
					class="bg-[#ffa5a5] h-40 w-40 rounded-full shadow-md object-cover p-4"
				/>
			</div>
			<input id="profilePicture" type="file" class="hidden" @change="handleFileUpload" />
			<button
				class="text-xs mt-2 rounded-full transition duration-200 shadow-lg px-6 py-3 text-white hover:bg-[#504366]"
				style="background-color: #65558f"
				@click="editMode ? triggerFileUpload() : toggleEditMode()"
			>
				{{ editMode ? 'Change Profile Pic' : 'Edit Profile' }}
			</button>
		</div>
		<!-- Form Fields -->
		<div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="w-3/4 mx-auto">
				<label for="name" class="block text-gray-600 font-medium text-xs">NAME</label>
				<input
					id="name"
					v-model="localName"
					placeholder="Enter your name"
					:readonly="!editMode"
					class="w-full p-3 text-xs rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
			</div>
			<div class="w-3/4 mx-auto">
				<label for="fullName" class="block text-gray-600 font-medium text-xs">FULL NAME</label>
				<input
					id="fullName"
					v-model="localFullName"
					placeholder="Enter your full name"
					:readonly="!editMode"
					class="w-full p-3 text-xs rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
			</div>

			<div class="w-3/4 mx-auto">
				<label for="age" class="block text-gray-600 font-medium text-xs">Age</label>
				<input
					id="age"
					v-model.number="localAge"
					type="number"
					placeholder="Enter your age"
					:readonly="!editMode"
					class="w-full p-3 text-xs rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
			</div>

			<div class="w-3/4 mx-auto">
				<label for="email" class="block text-gray-600 font-medium text-xs">Email</label>
				<input
					id="email"
					v-model="localEmail"
					type="email"
					placeholder="Enter your email"
					:readonly="!editMode"
					class="w-full p-3 text-xs rounded bg-white text-gray-800 shadow-md shadow-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
				/>
			</div>
		</div>
		<!-- Save Button -->
		<div v-if="editMode" class="max-w-3xl mx-auto mt-12 w-3/4 mx-auto text-xs">
			<button
				class="w-full py-3 rounded-full transition duration-200 shadow-lg text-white"
				style="background-color: #65558f"
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
	layout: 'window',
	showProfileIcon: false, // Uses fullscreen layout instead of default
})

const userStore = useUserStore()

// Local refs for temporary changes
const localName = ref('')
const localFullName = ref('')
const localAge = ref<number | null>(null)
const localEmail = ref('')
const localProfilePicture = ref('')
const editMode = ref(false) // Add edit mode ref

// Load userStore data into local refs when the component mounts
onMounted(() => {
	localName.value = userStore.name
	localFullName.value = userStore.fullName
	localAge.value = userStore.age
	localEmail.value = userStore.email
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
	userStore.updateProfile(
		localName.value,
		localFullName.value,
		'',
		localProfilePicture.value,
		localAge.value,
		localEmail.value,
	)
	editMode.value = false // Turn off edit mode after saving
}

const triggerFileUpload = () => {
	const input = document.getElementById('profilePicture') as HTMLInputElement
	input.click()
}

const toggleEditMode = () => {
	editMode.value = !editMode.value
}
</script>

<style scoped>
/* Remove the existing input-field styles, as they are now inline */
</style>
