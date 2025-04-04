<template>
	<div class="flex flex-col min-h-screen bg-nude-50">
		<!-- Navbar -->
		<header v-if="userStore.user" class="bg-transparent fixed inset-x-0 top-0 z-30">
			<nav class="container mx-auto px-4 py-4 flex justify-between items-center">
				<button class="text-nude-700 hover:text-nude-600 flex items-center" @click="toggleSidebar">
					<img src="/Sliding_Menu_Icon.png" alt="Menu Icon" class="w-6 h-6" />
				</button>
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
			<main class="flex-grow container mx-auto">
				<NuxtPage />
			</main>
		</div>

		<!-- Bottom Toolbar -->
		<div v-if="showToolbar" class="fixed inset-x-0 bottom-0 bg-white shadow-lg border-t-4 border-[#f4bbbb]">
			<nav class="flex justify-around py-2">
				<!-- Toolbar Links -->
				<NuxtLink
					v-for="item in toolbarItems"
					:key="item.path"
					:to="item.path"
					class="relative flex flex-col items-center px-4"
					:class="[isActive(item.path) ? 'text-[#ff0066]' : 'text-black hover:text-[#f4bbbb]']"
				>
					<!-- Icon -->
					<img
						:src="isActive(item.path) ? item.activeIcon : item.defaultIcon"
						:alt="item.label"
						class="w-6 h-6"
					/>

					<!-- Label -->
					<span class="text-xs mt-1">{{ item.label }}</span>

					<!-- Underline with fixed width and centered -->
					<div
						v-if="isActive(item.path)"
						class="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-[5px] bg-[#ff0066]"
					></div>
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

// Toolbar items
const toolbarItems = [
	{
		path: '/activities',
		label: 'Activities',
		defaultIcon: '/Toolbar_Activities_Icon.png',
		activeIcon: '/Toolbar_Activities_Icon_Pink.png',
	},
	{
		path: '/tasktracker',
		label: 'Tracker',
		defaultIcon: '/Toolbar_Tracker_Icon.png',
		activeIcon: '/Toolbar_Tracker_Icon_Pink.png',
	},
	{
		path: '/home',
		label: 'Home',
		defaultIcon: '/Toolbar_Home_Icon.png',
		activeIcon: '/Toolbar_Home_Icon_Pink.png',
	},
	{
		path: '/quizzes',
		label: 'Quizzes',
		defaultIcon: '/Toolbar_Quiz_Icon.png',
		activeIcon: '/Toolbar_Quiz_Icon_Pink.png',
	},
	{
		path: '/achievements',
		label: 'Achievements',
		defaultIcon: '/Toolbar_Achievements_Icon.png',
		activeIcon: '/Toolbar_Achievements_Icon_Pink.png',
	},
]
</script>
