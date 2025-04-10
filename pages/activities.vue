<template>
	<div>
		<!-- Header Tabs -->
		<div class="flex justify-around bg-gray-100 shadow-md border-b border-gray-300 mb-4">
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

		<!-- Placeholder content -->
		<div class="px-4">
			<p></p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['Assigned', 'Missing', 'Done']
const selectedTab = ref('Assigned')
</script>
