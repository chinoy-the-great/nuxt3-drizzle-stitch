<template>
	<div class="flex flex-col min-h-screen bg-nude-50">
		<!-- Navbar -->
		<header v-if="userStore.user" class="bg-white shadow">
			<nav class="container mx-auto px-4 py-4 flex justify-between items-center">
				<button class="text-nude-700 hover:text-nude-600 flex items-center" @click="toggleSidebar">
					<!-- Menu Icon -->
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
				<h1 class="text-nude-700 text-2xl font-bold">Stitch In Time</h1>
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

			<!-- Page content -->
			<main class="flex-grow container mx-auto px-4 py-6">
				<NuxtPage />
			</main>
		</div>

		<!-- Bottom Toolbar -->
		<div v-if="showToolbar" class="fixed inset-x-0 bottom-0 bg-white shadow-lg">
			<nav class="flex justify-around py-2">
				<!-- Home Icon -->
				<NuxtLink
					to="/home"
					class="flex flex-col items-center"
					:class="[isActive('/home') ? 'text-nude-800' : 'text-nude-600 hover:text-nude-800']"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
						/>
					</svg>
					<span class="text-sm mt-1">Home</span>
				</NuxtLink>

				<!-- Tracker Icon -->
				<NuxtLink
					to="/notes"
					class="flex flex-col items-center"
					:class="[isActive('/notes') ? 'text-nude-800' : 'text-nude-600 hover:text-nude-800']"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8c2.21 0 4-1.79 4-4S14.21 0 12 0s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.21 0-4 1.79-4 4v6h8v-6c0-2.21-1.79-4-4-4z"
						/>
					</svg>
					<span class="text-sm mt-1">Tracker</span>
				</NuxtLink>

				<!-- Quiz Icon -->
				<NuxtLink
					to="/quizzes"
					class="flex flex-col items-center"
					:class="[isActive('/quizzes') ? 'text-nude-800' : 'text-nude-600 hover:text-nude-800']"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 10h8M8 6h12M3 6h1M8 14h6M3 14h3m0 0h.01M3 18h6m6 0h5m-8 0h.01"
						/>
					</svg>
					<span class="text-sm mt-1">Quizzes</span>
				</NuxtLink>

				<!-- Notifications Icon -->
				<NuxtLink
					to="/notifications"
					class="flex flex-col items-center"
					:class="[isActive('/notifications') ? 'text-nude-800' : 'text-nude-600 hover:text-nude-800']"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.658V11c0-1.105-.895-2-2-2h-4a2 2 0 00-2 2v3.658a2.032 2.032 0 01-.595 1.437L8 17h5m0 0v1a2 2 0 104 0v-1m-5 1h2"
						/>
					</svg>
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
