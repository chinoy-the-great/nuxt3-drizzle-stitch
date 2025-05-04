<template>
	<transition name="dropdown" appear>
		<div
			v-if="isOpen"
			class="absolute top-0 left-0 transform -translate-x-2 -translate-y-2 bg-[#FF0066] rounded-full shadow-lg z-50 p-3"
		>
			<ul class="space-y-2">
				<!-- 1) Menu (just closes dropdown) -->
				<li>
					<button class="flex flex-col items-center" @click="emit('close')">
						<img src="/Sliding_Menu_Icon.png" alt="Open Menu" class="w-6 h-6 white-icon" />
						<span class="text-xxs text-white mt-1">Menu</span>
					</button>
				</li>

				<!-- 2) Settings DISABLED FOR NOW -->
				<!--				<li>-->
				<!--					<NuxtLink to="/settings" class="flex flex-col items-center" @click="emit('close')">-->
				<!--						<img src="/Settings_Icon.png" alt="Settings" class="w-6 h-6 white-icon" />-->
				<!--						<span class="text-xxs text-white mt-1">Settings</span>-->
				<!--					</NuxtLink>-->
				<!--				</li>-->

				<!-- 3) Logout -->
				<li>
					<NuxtLink to="/welcome" class="flex flex-col items-center" @click="logout">
						<img src="/Log_out_Icon.png" alt="Logout" class="w-6 h-6 white-icon" />
						<span class="text-xxs text-white mt-1">Logout</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</transition>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])
const userStore = useUserStore()

function logout() {
	userStore.clearUser()
	emit('close')
}
</script>

<style scoped>
.white-icon {
	filter: brightness(0) invert(1);
}
/* keep your fade/scale transition */
.dropdown-enter-active,
.dropdown-leave-active {
	transition: opacity 150ms ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
	opacity: 0;
}
.dropdown-enter-to,
.dropdown-leave-from {
	opacity: 1;
}
</style>
