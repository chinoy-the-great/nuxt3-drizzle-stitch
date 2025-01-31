<template>
	<aside
		class="fixed inset-y-0 left-0 z-30 w-64 bg-nude-700 bg-opacity-90 shadow-lg transition-transform transform"
		:class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
	>
		<div class="p-4 relative">
			<!-- Close Button -->
			<button
				class="absolute top-4 right-4 text-white hover:text-nude-800 focus:outline-none"
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
				<img src="/Your_Account_Icon.png" alt="Avatar" class="32 h-32 mb-2 filter invert brightness-200" />
				<h3 class="text-white text-lg font-semibold">Name</h3>
			</div>

			<!-- Sidebar content -->
			<h2 class="text-white text-center text-xl font-bold mb-1 border-b border-t pt-1 pb-1">YOUR ACCOUNT</h2>
			<ul class="space-y-2">
				<li class="border-b border-white pb-1">
					<NuxtLink to="/settings" class="flex items-center text-white hover:text-nude-600">
						<!-- Image Icon -->
						<img
							src="/public/Settings_Icon.png"
							alt="Settings"
							class="w-5 h-5 mr-3 filter invert brightness-200"
						/>
						Settings
					</NuxtLink>
				</li>
				<li class="border-b border-white pb-1">
					<NuxtLink to="/references" class="flex items-center text-white hover:text-nude-600">
						<!-- Image Icon -->
						<img
							src="/public/References_Icon.png"
							alt="References"
							class="w-5 h-5 mr-3 filter invert brightness-200"
						/>
						References
					</NuxtLink>
				</li>
				<li class="border-b border-white pb-1">
					<NuxtLink
						to="/login"
						class="flex items-center text-white hover:text-nude-600"
						@click="userStore.clearUser"
					>
						<!-- Image Icon -->
						<img
							src="/public/Log_out_Icon.png"
							alt="Logout"
							class="w-5 h-5 mr-3 filter invert brightness-200"
						/>
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
