<template>
	<div :class="layoutClasses" class="flex flex-col min-h-screen bg-white">
		<!-- Navbar -->
		<header class="bg-white w-full z-30 border-b-2 border-[#ffa5a5]">
			<nav class="container mx-auto px-4 py-4 flex justify-between items-center">
				<!-- Left: Back Icon (FontAwesome) -->
				<button class="text-black hover:text-nude-600 flex items-center" @click="onBackClick">
					<i class="fa fa-arrow-left text-xl"></i>
					<!-- FontAwesome Back Icon -->
				</button>

				<!-- Right: Notifications & Profile Icons -->
				<div class="flex space-x-4 items-center">
					<NuxtLink to="/notifications">
						<img src="/Titlebar_Notification_Icon.png" alt="Notifications" class="w-4 h-4" />
					</NuxtLink>
					<NuxtLink to="/profile">
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

const userStore = useUserStore()

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
