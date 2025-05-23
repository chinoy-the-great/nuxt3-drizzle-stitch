<template>
	<Teleport v-if="show" to="body">
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
			role="dialog"
			aria-modal="true"
			@click.self="close"
		>
			<div class="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
				<h2 class="text-2xl font-bold mb-4">Registration Successful!</h2>
				<p class="text-lg mb-6">Your account has been created.</p>
				<button class="bg-[#65558f] hover:bg-purple-700 text-white px-6 py-2 rounded-full" @click="confirm">
					Go to Login
				</button>
			</div>
		</div>
	</Teleport>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

defineProps({
	show: { type: Boolean, default: false },
})

const emit = defineEmits(['update:show', 'confirm'])

function close() {
	emit('update:show', false)
}

function confirm() {
	emit('confirm')
	close()
}
</script>
