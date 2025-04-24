<template>
	<div :class="layoutClasses" class="flex flex-col min-h-screen bg-white">
		<!-- Navbar -->
		<header
			class="w-full z-30 border-b-2"
			:style="{
				backgroundColor: headerBgColor,
				borderColor: headerBorderColor,
			}"
		>
			<nav class="container mx-auto px-4 py-4 flex justify-between items-center">
				<!-- Left: Back Icon and Page Title -->
				<div class="flex items-center space-x-8">
					<button class="text-black hover:text-nude-600 flex items-center" @click="onBackClick">
						<i class="fa fa-arrow-left text-xl"></i>
					</button>
					<span class="text-sm font-semibold text-black">{{ pageTitle }}</span>
				</div>
			</nav>
		</header>

		<!-- Page content -->
		<main class="flex-grow container mx-auto" :style="{ backgroundColor: mainBgColor }">
			<NuxtPage />
		</main>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => route.meta.title || '')

const headerBgColor = computed<string>(() => {
	return (route.meta.headerBg as string) ?? '#ffe9fa'
})

const headerBorderColor = computed<string>(() => {
	return (route.meta.headerBorder as string) ?? '#ffa5a5'
})

const mainBgColor = computed<string>(() => {
	return (route.meta.mainBg as string) ?? '#ffe9fa'
})

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
