<template>
	<div class="flex flex-col min-h-screen bg-nude-50">
		<!-- Navbar -->
		<header v-if="userStore.user" class="bg-transparent fixed inset-x-0 top-0 z-30">
			<nav class="container mx-auto px-4 py-4 flex justify-between items-center">
				<button class="text-nude-700 hover:text-nude-600 flex items-center" @click="toggleSidebar">
					<!-- Menu Icon -->
					<img
						src="/Sliding_Menu_Icon.png"
						alt="Menu Icon"
						class="w-6 h-6 filter"
						:style="{
							filter:
								'invert(19%) sepia(69%) saturate(134%) hue-rotate(-4deg) brightness(87%) contrast(103%)',
						}"
					/>
				</button>
				<ul class="flex space-x-4">
					<!-- Remove login/register for now -->
				</ul>
			</nav>
		</header>

		<div class="flex flex-grow">
			<!-- Sidebar -->
			<Sidebar
				v-if="userStore.user"
				:is-open="isSidebarOpen"
				@update:is-open="isSidebarOpen = $event"
				@close="toggleSidebar"
			/>

			<!-- Page content (overlapping the header) -->
			<main class="flex-grow container mx-auto">
				<!-- Adjusted margin-top to overlap the header -->
				<NuxtPage />
			</main>
		</div>

		<!-- Bottom Toolbar -->
		<div v-if="showToolbar" class="fixed inset-x-0 bottom-0 bg-[#381816] shadow-lg">
			<nav class="flex justify-around py-2">
				<!-- Home Icon -->
				<NuxtLink
					to="/home"
					class="flex flex-col items-center"
					:class="[isActive('/home') ? 'text-gray-500' : 'text-white hover:text-gray-500']"
				>
					<img src="/Toolbar_Home_Icon.png" alt="Home Icon" class="w-6 h-6 filter invert brightness-0" />
					<span class="text-sm mt-1">Home</span>
				</NuxtLink>

				<!-- Tracker Icon -->
				<NuxtLink
					to="/tasktracker"
					class="flex flex-col items-center"
					:class="[isActive('/tasktracker') ? 'text-gray-500' : 'text-white hover:text-gray-500']"
				>
					<img
						src="/Toolbar_Tracker_Icon.png"
						alt="Tracker Icon"
						class="w-6 h-6 filter invert brightness-0"
					/>
					<span class="text-sm mt-1">Tracker</span>
				</NuxtLink>

				<!-- Quiz Icon -->
				<NuxtLink
					to="/quizzes"
					class="flex flex-col items-center"
					:class="[isActive('/quizzes') ? 'text-gray-500' : 'text-white hover:text-gray-500']"
				>
					<img src="/Toolbar_Quiz_Icon.png" alt="Quiz Icon" class="w-6 h-6 filter invert brightness-0" />
					<span class="text-sm mt-1">Quizzes</span>
				</NuxtLink>

				<!-- Notifications Icon -->
				<NuxtLink
					to="/notifications"
					class="flex flex-col items-center"
					:class="[isActive('/notifications') ? 'text-gray-500' : 'text-white hover:text-gray-500']"
				>
					<img
						src="/Toolbar_Notification_Icon.png"
						alt="Notifications Icon"
						class="w-6 h-6 filter invert brightness-0"
					/>
					<span class="text-sm mt-1">Notifications</span>
				</NuxtLink>
			</nav>
		</div>
	</div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import { useUserStore } from '@/stores/user'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value
}

const userStore = useUserStore()

const route = useRoute()
const showToolbar = ref(true)

// Specify the routes where the toolbar should be hidden
const hiddenToolbarRoutes = ['/login', '/register']

// Watch for changes in the route and update showToolbar accordingly
watch(
	() => route.path,
	(newPath) => {
		showToolbar.value = !hiddenToolbarRoutes.includes(newPath)
	},
	{ immediate: true },
)

// Function to check if the current route matches the link
const isActive = (path) => {
	return route.path === path
}
</script>
