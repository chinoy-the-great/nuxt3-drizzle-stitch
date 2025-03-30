<template>
	<div class="flex flex-col items-center justify-center min-h-screen p-6" style="background-color: #fcd9d8">
		<!-- Title -->
		<h1 class="text-2xl text-black mt-8 text-center">Welcome to</h1>

		<!-- New Large Italicized Label -->
		<p class="text-4xl font-bold italic text-black mb-6 text-center">Stitch in Time</p>

		<!-- Image -->
		<img
			src="/STITCH IN TIME LOGO.png"
			alt="Welcome Image"
			class="w-72 h-72 object-contain rounded-lg mb-8"
		/>

		<!-- Small Label -->
		<p class="text-sm text-center text-gray-600 mb-8">
			Get your account now and let's
			<br />
			get started already.
		</p>

		<!-- Sign In Button -->
		<NuxtLink
			to="/login"
			class="w-full max-w-xs py-3 text-center text-white rounded-full transition duration-200"
			style="background-color: #65558f"
		>
			SIGN IN
		</NuxtLink>

		<!-- OR Label with Vertical Lines, Matching Button Width -->
		<div class="flex items-center justify-center w-full max-w-[300px] my-2">
			<div class="flex-1 border-t border-black"></div>
			<span class="mx-2 text-sm text-black">OR</span>
			<div class="flex-1 border-t border-black"></div>
		</div>

		<!-- Sign Up Button -->
		<NuxtLink
			to="/register"
			class="w-full max-w-xs py-3 text-center text-black border border-black rounded-full transition duration-200"
			style="background-color: transparent"
		>
			SIGN UP
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'fullscreen', // Uses fullscreen layout instead of default
})
</script>
