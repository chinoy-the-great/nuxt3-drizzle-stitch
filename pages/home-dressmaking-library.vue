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
			<div class="w-full h-32 bg-[#D76A7D] flex justify-center items-center p-4 rounded-lg mb-4">
				<div class="text-white font-bold text-4xl">SEWING TECHNIQUES</div>
			</div>
		</NuxtLink>

		<!-- Link for Dressmaking Tools -->
		<NuxtLink :to="{ path: '/home-library-fabric-guide', query: { type: 'tools' } }">
			<div class="w-full h-32 bg-[#D76A7D] flex justify-center items-center p-4 rounded-lg mb-4">
				<div>
					<div class="text-white font-bold text-4xl">DRESSMAKING TOOLS</div>
				</div>
			</div>
		</NuxtLink>

		<!-- Link for Troubleshooting Guide -->
		<NuxtLink :to="{ path: '/home-library-fabric-guide', query: { type: 'troubleshooting' } }">
			<div class="w-full h-32 bg-[#D76A7D] flex justify-center items-center p-4 rounded-lg">
				<div>
					<div class="text-white font-bold text-4xl">TROUBLESHOOTING</div>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>

<script>
export default {
	name: 'FourRows',
}
</script>

<style scoped></style>
