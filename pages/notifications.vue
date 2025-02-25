<template>
	<div class="max-w-3xl mx-auto mt-8 mb-16 p-6">
		<h1 class="text-2xl font-semibold mb-4">Notifications</h1>

		<div
			v-for="(notification, index) in notifications"
			:key="index"
			class="p-4 mb-4 bg-[#EFBCC3] rounded-lg shadow-sm flex"
		>
			<!-- Icon -->
			<div class="mr-4 text-2xl">
				{{ notification.icon }}
			</div>

			<!-- Notification Content -->
			<div class="flex-grow">
				<p class="font-semibold text-gray-800">{{ notification.message }}</p>
				<p class="text-gray-700">{{ notification.description }}</p>
				<span class="text-sm text-gray-500">{{ notification.time }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([
	{
		id: 1,
		type: 'comment',
		message: 'New Comment',
		description: 'John commented on your post.',
		time: '2 hours ago',
		icon: '💬',
	},
	{
		id: 2,
		type: 'like',
		message: 'New Like',
		description: 'Alice liked your photo.',
		time: '1 day ago',
		icon: '❤️',
	},
	{
		id: 3,
		type: 'upload',
		message: 'New Upload',
		description: 'A new tutorial was uploaded in your subscribed channel.',
		time: '3 days ago',
		icon: '📹',
	},
	{
		id: 4,
		type: 'comment',
		message: 'New Comment',
		description: 'Bob commented on your video.',
		time: '4 days ago',
		icon: '💬',
	},
	{
		id: 5,
		type: 'task',
		message: 'Task Reminder',
		description: 'You have a task due soon. Don’t forget to check it!',
		time: '6 hours ago',
		icon: '⏰',
	},
])
</script>
