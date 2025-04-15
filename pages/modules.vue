<template>
	<div class="min-h-screen bg-white">
		<!-- Header Image -->
		<div
			class="w-full shadow-md shadow-gray-400"
			style="
				background-image: url('/_BG_ART_LogIn_home_v2.jpg');
				background-size: cover;
				background-position: center;
				height: 12vh;
			"
		></div>

		<div v-for="(grade, gradeIndex) in foldersData" :key="gradeIndex" class="p-8">
			<h1 class="text-2xl font-bold mb-2">{{ grade.mainLabel }}</h1>

			<div v-for="(item, itemIndex) in grade.items" :key="itemIndex">
				<h2 v-if="item.type === 'subLabel'" class="text-base font-semibold mb-2 mt-2">
					{{ item.name }}
				</h2>

				<div
					v-else-if="item.type === 'pdf'"
					class="flex items-center rounded-xl w-full cursor-pointer overflow-hidden mb-4 h-[70px] shadow-md shadow-gray-400"
				>
					<!-- Gray Container with PDF Icon -->
					<div
						class="bg-gray-200 rounded-l-xl h-[70px] w-20 flex items-center justify-center min-w-[80px] max-w-[80px]"
					>
						<img src="/Modules_PDF_Icon.png" alt="PDF Icon" class="h-10 w-10 object-contain" />
					</div>

					<!-- PDF Information Container (Right Side) -->
					<div
						class="flex-1 flex flex-col justify-center items-start text-left bg-[#ffa5a5] rounded-r-xl h-[70px] p-4 min-h-[70px]"
					>
						<p class="text-xs font-bold text-black">{{ item.title }}</p>
						<p class="text-[10px] text-black">{{ item.secondaryTitle }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// Assuming foldersData.js is in the assets folder

import { foldersData } from 'assets/foldersData.js'

definePageMeta({
	layout: 'window',
})
// No need for toggleVideo or video expansion logic for now
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
