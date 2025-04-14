<template>
	<div :class="layoutClasses" class="flex flex-col min-h-screen bg-white">
		<!-- Navbar -->
		<header class="bg-white w-full z-30 border-b-2 border-[#ffa5a5]">
			<nav class="container mx-auto px-4 py-4 flex justify-between items-center">
				<!-- Left: Back Icon and Page Title -->
				<div class="flex items-center space-x-8">
					<button class="text-black hover:text-nude-600 flex items-center" @click="onBackClick">
						<i class="fa fa-arrow-left text-xl"></i>
					</button>
					<span class="text-sm font-semibold text-black">{{ pageTitle }}</span>
				</div>

				<!-- Right: Notifications & Profile Icons -->
				<div class="flex space-x-4 items-center">
					<NuxtLink to="/notifications">
						<img src="/Titlebar_Notification_Icon.png" alt="Notifications" class="w-4 h-4" />
					</NuxtLink>
					<NuxtLink v-if="showProfileIcon" to="/profile">
						<img
							:src="userStore.profilePicture"
							:style="userStore.profilePicture === '/Your_Account_Icon.png'"
							alt="Profile"
							class="w-8 h-8 rounded-full object-cover"
						/>
					</NuxtLink>
				</div>
			</nav>
		</header>

		<!-- Page content -->
		<main class="flex-grow container mx-auto">
			<NuxtPage />
		</main>
	</div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()

const pageTitle = computed(() => route.meta.title || '')
const showProfileIcon = computed(() => route.meta.showProfileIcon !== false)

// Handle Back Button Click
const onBackClick = () => {
	// Go back to the previous page
	window.history.back()
}

// Layout Classes (you can add more dynamic behavior if necessary)
const layoutClasses = {
	'bg-white': true, // White background for the header
}
</script>
