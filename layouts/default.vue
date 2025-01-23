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
					<img src="/Toolbar_Home_Icon.png" alt="Home Icon" class="w-6 h-6" />
					<span class="text-sm mt-1">Home</span>
				</NuxtLink>

				<!-- Tracker Icon -->
				<NuxtLink
					to="/tasktracker"
					class="flex flex-col items-center"
					:class="[isActive('/tasktracker') ? 'text-nude-800' : 'text-nude-600 hover:text-nude-800']"
				>
					<img src="/Toolbar_Tracker_Icon.png" alt="Tracker Icon" class="w-6 h-6" />
					<span class="text-sm mt-1">Tracker</span>
				</NuxtLink>

				<!-- Quiz Icon -->
				<NuxtLink
					to="/quizzes"
					class="flex flex-col items-center"
					:class="[isActive('/quizzes') ? 'text-nude-800' : 'text-nude-600 hover:text-nude-800']"
				>
					<img src="/Toolbar_Quiz_Icon.png" alt="Quiz Icon" class="w-6 h-6" />
					<span class="text-sm mt-1">Quizzes</span>
				</NuxtLink>

				<!-- Notifications Icon -->
				<NuxtLink
					to="/notifications"
					class="flex flex-col items-center"
					:class="[isActive('/notifications') ? 'text-nude-800' : 'text-nude-600 hover:text-nude-800']"
				>
					<img src="/Toolbar_Notification_Icon.png" alt="Notifications Icon" class="w-6 h-6" />
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
