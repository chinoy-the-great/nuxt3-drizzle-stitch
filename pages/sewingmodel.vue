<template>
	<div class="flex flex-col items-center justify-center min-h-screen mb-8 pt-4">
		<div class="flex flex-col items-start justify-start w-full max-w-5xl mx-auto px-4">
			<h1 class="text-2xl font-semibold mt-2 mb-2 text-left">3D Sewing Machine</h1>
			<div class="w-full flex items-center justify-center bg-transparent rounded shadow-lg">
				<Vue3dLoader
					:height="500"
					:width="500"
					:file-path="['/3d_model_machine.fbx']"
					:mtl-path="[null, '/obj/2.mtl', null]"
					:background-color="0xadd8e6"
				/>
			</div>
		</div>

		<div class="w-full">
			<!-- Header Tabs -->
			<div class="flex justify-around bg-gray-100 shadow-md border-b border-gray-300 mb-4 w-full">
				<div
					v-for="tab in tabs"
					:key="tab"
					class="relative py-2 cursor-pointer text-xs font-normal text-gray-700 w-full text-center"
					@click="selectedTab = tab"
				>
					{{ tab }}
					<!-- Black underline if selected -->
					<div
						v-if="selectedTab === tab"
						class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-[2px] bg-black rounded-full"
					></div>
				</div>
			</div>

			<!-- Tab Content -->
			<div class="px-4 text-sm text-gray-800 min-h-[150px]">
				<div v-if="selectedTab === 'History'">
					<p>
						The sewing machine was invented during the first Industrial Revolution to decrease the amount of
						manual sewing work performed in clothing companies. It was a groundbreaking innovation that
						allowed garments to be produced at a faster pace.
					</p>
				</div>
				<div v-else-if="selectedTab === 'Sewing Machine Parts'">
					<ul class="list-disc list-inside">
						<li>
							<strong>Handwheel:</strong>
							The handwheel is used to manually raise and lower the needle.
						</li>
						<li>
							<strong>Spool Pin:</strong>
							This pin holds the spool of thread and allows it to unwind while sewing.
						</li>
						<li>
							<strong>Thread Guide:</strong>
							The thread guide ensures the thread runs smoothly from the spool to the needle.
						</li>
						<li>
							<strong>Needle Clamp:</strong>
							The needle clamp secures the sewing needle in place.
						</li>
						<li>
							<strong>Presser Foot:</strong>
							The presser foot holds the fabric in place while it is being sewn.
						</li>
						<li>
							<strong>Bobbin Case:</strong>
							The bobbin case holds the bobbin and ensures that the bobbin thread is tensioned correctly.
						</li>
						<li>
							<strong>Stitch Selector:</strong>
							The stitch selector allows the user to choose the type of stitch to use.
						</li>
						<li>
							<strong>Feed Dogs:</strong>
							The feed dogs move the fabric through the sewing machine while stitching.
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { vue3dLoader as Vue3dLoader } from 'vue-3d-loader'

definePageMeta({
	layout: 'window',
})

const tabs = ['History', 'Sewing Machine Parts']
const selectedTab = ref('History')
</script>
