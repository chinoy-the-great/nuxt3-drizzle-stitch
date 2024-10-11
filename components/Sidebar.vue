<template>
	<aside
		class="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition-transform transform"
		:class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
	>
		<div class="p-4 relative">
			<!-- Close Button -->
			<button
				class="absolute top-4 right-4 text-nude-600 hover:text-nude-800 focus:outline-none"
				@click="emit('close')"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<!-- Avatar and Name Section -->
			<div class="flex flex-col items-center mb-6">
				<img
					src="/Your_Account_Icon.png"
					alt="Avatar"
					class="32 h-32 rounded-full mb-2 border border-nude-300"
				/>
				<h3 class="text-nude-700 text-lg font-semibold">Your Account</h3>
			</div>

			<!-- Sidebar content -->
			<h2 class="text-nude-700 text-xl font-bold mb-4">Navigation</h2>
			<ul class="space-y-2">
				<li>
					<NuxtLink to="/login" class="block text-nude-700 hover:text-nude-600">Login</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/register" class="block text-nude-700 hover:text-nude-600">Register</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/fabric-guide" class="block text-nude-700 hover:text-nude-600">Fabric Guide</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/tutorials" class="block text-nude-700 hover:text-nude-600">Tutorials</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/notes" class="block text-nude-700 hover:text-nude-600">Notes</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/quizzes" class="block text-nude-700 hover:text-nude-600">Quizzes</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/login" class="block text-nude-700 hover:text-nude-600" @click="userStore.clearUser">
						Logout
					</NuxtLink>
				</li>
				<!-- Add more links as needed -->
			</ul>
		</div>
	</aside>
</template>

<script setup>
defineProps(['isOpen'])
const emit = defineEmits(['close'])
const userStore = useUserStore()
</script>

<style scoped>
/* Add any additional styles here */
</style>
