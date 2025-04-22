<template>
	<div class="min-h-screen bg-white mb-8">
		<!-- Achievements Label -->
		<div class="bg-[#ffa5a5] h-16 flex items-center justify-center">
			<h1 class="text-2xl font-semibold text-black">Calendar</h1>
		</div>

		<div v-for="section in scheduleData" :key="section.date" class="p-6">
			<!-- Date header -->
			<h2 class="font-semibold text-sm mb-4">
				{{ section.display }}
			</h2>

			<ul class="space-y-4">
				<li
					v-for="item in section.items"
					:key="item.id"
					class="flex border-l-4 bg-white rounded"
					:class="item.type === 'event' ? 'border-blue-500' : 'border-yellow-400'"
				>
					<!-- EVENT VIEW -->
					<template v-if="item.type === 'event'">
						<div class="pl-4 py-1 flex flex-col justify-center">
							<div class="flex items-center">
								<span class="text-sm font-medium">{{ item.start }}</span>
								<span class="text-sm ml-2">{{ item.name }}</span>
							</div>
							<div class="flex items-center text-sm text-gray-600 mt-1">
								<span class="text-sm">{{ item.end }}</span>
								<span class="text-sm ml-2">{{ item.place }}</span>
							</div>
						</div>
					</template>

					<!-- TASK VIEW -->
					<template v-else>
						<div class="pl-4 py-1 flex items-center">
							<input
								v-model="item.done"
								type="checkbox"
								class="h-5 w-5 appearance-none rounded-full border-2 border-black checked:bg-gray-400 checked:border-gray-400 focus:outline-none flex-shrink-0 transition"
							/>
							<div class="ml-4 flex flex-col">
								<span
									:class="item.done ? 'text-gray-400 line-through' : 'text-gray-900'"
									class="text-sm font-medium"
								>
									{{ item.name }}
								</span>
								<span :class="item.done ? 'text-gray-400 line-through' : 'text-gray-600'" class="text-sm">
									{{ item.description }}
								</span>
							</div>
						</div>
					</template>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * scheduleData is an array of "sections" grouped by date.
 * section.display is what you show as the heading (e.g. "Monday 03/01/25")
 * section.items is a mixed array of {type:'event' or 'task'} objects
 */
const scheduleData = ref([
	{
		date: '2025-03-01',
		display: 'Monday 03/01/25',
		items: [
			{
				id: 1,
				type: 'event',
				start: '9:00 AM',
				name: '2nd Lecture',
				end: '10:00 AM',
				place: 'Event Hall',
			},
			{
				id: 2,
				type: 'task',
				name: 'Watch Video',
				description: 'How to Set Up Sewing Machine',
				done: false,
			},
			{
				id: 3,
				type: 'event',
				start: '11:00 AM',
				name: 'Office Hours',
				end: '12:00 PM',
				place: 'Prof. Smith Office',
			},
			{
				id: 4,
				type: 'task',
				name: 'Read Chapter 3',
				description: 'History of Art',
				done: false,
			},
		],
	},
	{
		date: '2025-03-02',
		display: 'Tuesday 03/02/25',
		items: [
			{
				id: 5,
				type: 'task',
				name: 'Write Summary',
				description: 'Chapters 1–2 notes',
				done: false,
			},
		],
	},
])
</script>
