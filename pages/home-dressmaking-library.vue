<template>
	<div class="space-y-4 mb-24">
		<!-- First Row -->
		<NuxtLink to="/home-library-fabric-guide">
			<div class="w-full h-32 bg-[#D76A7D] flex items-start justify-start p-4 rounded-lg">
				<div>
					<div class="text-white font-bold text-xl">FABRIC GUIDE</div>
					<div class="text-white text-sm mt-1">
						A fabric guide is a resource that provides information about different fabrics, their properties,
						and how they can be used in sewing and garment making.
					</div>
				</div>
			</div>
		</NuxtLink>

		<!-- Second Row -->
		<div class="w-full h-32 bg-[#D76A7D] flex items-start justify-start p-4 rounded-lg">
			<div>
				<div class="text-white font-bold text-xl">SEWING TECHNIQUES</div>
				<div class="text-white text-sm mt-1">
					Sewing techniques are the methods and processes used for joining pieces of fabric together to create
					a finished garment.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ThreeRows',
}
</script>

<style scoped></style>
