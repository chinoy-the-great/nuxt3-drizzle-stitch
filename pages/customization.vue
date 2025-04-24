<template>
	<div>
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

		<!-- New Pattern Customization Box -->
		<div class="flex justify-center mt-8">
			<!-- NuxtLink in place of your div -->
			<NuxtLink
				to="/customization-pattern"
				class="flex items-center bg-white border-2 border-black rounded-md px-3 py-2 w-[85%] shadow-md shadow-gray-400 hover:bg-gray-50 transition"
			>
				<!-- Plus Icon -->
				<div class="flex items-center justify-center border border-black rounded-full w-6 h-6 mr-3 bg-white">
					<i class="fas fa-plus text-xs text-black"></i>
				</div>

				<!-- Label -->
				<span class="text-xxs text-black font-semibold">New Pattern Customization</span>
			</NuxtLink>
		</div>

		<!-- Section with two rectangles and labels below -->
		<div class="flex justify-center mt-4">
			<div class="w-[85%] flex gap-2 flex-col items-center">
				<div class="flex w-full gap-2">
					<!-- Left Rectangle (2/3 width) -->
					<NuxtLink
						to="/customization-my-creation"
						class="w-2/3 bg-[#ffe9fa] h-32 rounded-md shadow-md shadow-gray-400"
					></NuxtLink>

					<!-- Right Rectangle (1/3 width) -->
					<div class="w-1/3 bg-[#ff0066] h-32 rounded-md shadow-md shadow-gray-400"></div>
				</div>

				<div class="flex w-full gap-2 mt-1">
					<span class="w-2/3 text-center text-xxs text-black">My Creation</span>
					<span class="w-1/3 text-center text-xxs text-black">Pattern Template</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: 'customizationwindow',
	title: 'Customization',
	headerBg: '#ffffff',
	headerBorder: '#ffa5a5',
	mainBg: '#ffffff',
})
</script>
