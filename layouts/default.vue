<template>
	<div class="flex flex-col min-h-screen bg-nude-50">
		<!-- Navbar -->
		<header class="bg-white shadow">
			<nav class="container mx-auto px-4 py-4 flex justify-between items-center">
				<h1 class="text-nude-700 text-2xl font-bold">My Website</h1>
				<ul class="flex space-x-4">
					<li>
						<NuxtLink to="/login" class="text-nude-700 hover:text-nude-600">Login</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/register" class="text-nude-700 hover:text-nude-600">Register</NuxtLink>
					</li>
				</ul>
			</nav>
		</header>

		<!-- Page content -->
		<main class="flex-grow container mx-auto px-4 py-6">
			<NuxtPage />
		</main>

		<!-- Footer -->
		<footer class="bg-white shadow mt-4">
			<div class="container mx-auto px-4 py-4 text-center text-gray-600">
				<p>&copy; 2024 My Website</p>
			</div>
		</footer>
	</div>
</template>

<script setup></script>

<style scoped>
/* Add any additional styles here */
</style>
