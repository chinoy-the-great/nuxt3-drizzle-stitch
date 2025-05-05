<template>
	<div class="max-w-3xl mx-auto mb-16 p-6">
		<h1 class="text-2xl font-semibold mb-4">Notifications</h1>

		<div v-if="sortedNotifications.length" class="space-y-4">
			<div
				v-for="note in sortedNotifications"
				:key="note.id"
				class="flex items-center p-4 bg-[#f4bbbb] rounded-lg h-[70px] shadow-md shadow-gray-400 cursor-pointer"
				@click="onNoteClick(note)"
			>
				<img :src="iconsByType[note.type]" :alt="`${note.type} icon`" class="h-8 w-8 flex-shrink-0 mr-4" />
				<div>
					<p class="text-xs font-bold text-black ml-4">{{ note.message }}</p>
					<p class="text-xxs text-black ml-4">{{ note.description }}</p>
					<span class="text-xxs text-gray-500 ml-4">{{ note.time }}</span>
				</div>
			</div>
		</div>

		<p v-else class="text-gray-600">You have no notifications.</p>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

// 1) notifications array…
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

// 2) icon map…
const iconsByType = {
	activity: '/Toolbar_Activities_Icon.png',
	achievement: '/Toolbar_Achievements_Icon.png',
	video: '/Video_Icon.png',
}

// 3) sorted list…
const sortedNotifications = computed(() => [...notifications.value].sort((a, b) => b.id - a.id))

// 4) navigation handler
const router = useRouter()

function onNoteClick(note) {
	if (note.type === 'video') {
		// replace 'Tutorials' with your actual route name or path
		router.push('/tutorials')
	} else {
		// fallback: do nothing or go somewhere else
		console.log('clicked a non-video notification:', note)
	}
}
</script>
