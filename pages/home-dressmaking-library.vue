<template>
	<div class="space-y-4 mb-24 mx-4">
		<!-- Link for Fabric Guide (Default) -->
		<NuxtLink :to="{ path: '/home-library-fabric-guide', query: { type: 'fabric' } }">
			<div class="w-full h-32 bg-[#D76A7D] flex justify-center items-center p-4 rounded-lg mb-4">
				<div>
					<div class="text-white font-bold text-4xl">MODULES</div>
				</div>
			</div>
		</NuxtLink>

		<!-- Link for Sewing Techniques -->
		<NuxtLink :to="{ path: '/home-library-fabric-guide', query: { type: 'sewing' } }">
			<div class="w-full h-32 bg-[#D76A7D] flex justify-center items-center p-4 rounded-lg">
				<div class="text-white font-bold text-4xl">SEWING TECHNIQUES</div>
			</div>
		</NuxtLink>

		<!-- Third Row -->
		<div class="w-full h-32 bg-[#D76A7D] flex justify-center items-center p-4 rounded-lg">
			<div>
				<div class="text-white font-bold text-4xl">DRESSMAKING TOOLS</div>
				<div class="text-white text-sm mt-1"></div>
			</div>
		</div>

		<!-- Fourth Row -->
		<div class="w-full h-32 bg-[#D76A7D] flex justify-center items-center p-4 rounded-lg">
			<div>
				<div class="text-white font-bold text-4xl">TROUBLESHOOTING</div>
				<div class="text-white text-sm mt-1"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FourRows',
}
</script>

<style scoped></style>
