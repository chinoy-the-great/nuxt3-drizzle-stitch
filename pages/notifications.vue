<template>
	<div class="max-w-3xl mx-auto mb-16 p-6">
		<h1 class="text-2xl font-semibold mb-4">Notifications</h1>

		<!-- Notification List -->
		<div v-if="sortedNotifications.length" class="space-y-4">
			<div
				v-for="note in sortedNotifications"
				:key="note.id"
				class="flex items-center p-4 bg-[#f4bbbb] rounded-lg h-[70px] shadow-md shadow-gray-400"
			>
				<!-- big icon, centered -->
				<img :src="iconsByType[note.type]" :alt="`${note.type} icon`" class="h-8 w-8 flex-shrink-0 mr-4" />
				<!-- text -->
				<div>
					<p class="text-xs font-bold text-black ml-4">{{ note.message }}</p>
					<p class="text-xxs text-black ml-4">{{ note.description }}</p>
					<span class="text-xxs text-gray-500 ml-4">{{ note.time }}</span>
				</div>
			</div>
		</div>

		<!-- empty state -->
		<p v-else class="text-gray-600">You have no notifications.</p>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'

// 1) Your master array; keeps a `type` field
const notifications = ref([
	{
		id: 1,
		type: 'activity',
		message: 'New Activity Assigned',
		description: 'How to set up the Sewing Machine',
		time: '3 days ago',
	},
	{
		id: 2,
		type: 'achievement',
		message: 'New Achievement',
		description: 'You finished a quiz!',
		time: '2 hours ago',
	},
	{
		id: 3,
		type: 'activity',
		message: 'New Activity Assigned',
		description: 'Write project report',
		time: 'Just now',
	},

	// 2) NEW: three video‐type placeholders
	{
		id: 4,
		type: 'video',
		message: 'New Video Tutorial!',
		description: 'Kinds of Sewing Stitches',
		time: '5 hours ago',
	},
	{
		id: 5,
		type: 'video',
		message: 'New Video Tutorial!',
		description: 'Needle Getting Stuck in the Material',
		time: '2 hours ago',
	},
	{
		id: 6,
		type: 'video',
		message: 'New Video Tutorial!',
		description: 'Taking Body Measurements',
		time: 'Just now',
	},
])

// 3) Map each type to your public icons
const iconsByType = {
	activity: '/Toolbar_Activities_Icon.png',
	achievement: '/Toolbar_Achievements_Icon.png',
	video: '/Video_Icon.png', // <-- your video icon
}

// 4) If you want newest‐first, sort by id descending
const sortedNotifications = computed(() => [...notifications.value].sort((a, b) => b.id - a.id))
</script>
