<template>
	<div class="max-w-3xl mx-auto mt-8 p-6">
		<h1 class="text-2xl font-semibold mb-4">Notifications</h1>

		<div
			v-for="(notification, index) in notifications"
			:key="index"
			class="flex items-center p-4 mb-4 bg-[#EFBCC3] rounded-lg shadow-sm"
		>
			<div
				:class="notificationIconClass(notification.type)"
				class="w-12 h-12 rounded-full flex items-center justify-center mr-4"
			>
				<span :class="notificationTextClass(notification.type)" class="text-lg font-bold">
					{{ notification.icon }}
				</span>
			</div>

			<div class="flex-grow">
				<p class="text-gray-700 text-base mb-2">{{ notification.message }}</p>
				<span class="text-sm text-gray-500">{{ notification.time }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

// Sample notifications data
const notifications = ref([
	{
		id: 1,
		type: 'comment', // Can be 'like', 'upload', 'comment', etc.
		message: 'John commented on your post.',
		time: '2 hours ago',
		icon: '💬',
	},
	{
		id: 2,
		type: 'like',
		message: 'Alice liked your photo.',
		time: '1 day ago',
		icon: '❤️',
	},
	{
		id: 3,
		type: 'upload',
		message: 'New tutorial uploaded in your subscribed channel.',
		time: '3 days ago',
		icon: '📹',
	},
	{
		id: 4,
		type: 'comment',
		message: 'Bob commented on your video.',
		time: '4 days ago',
		icon: '💬',
	},
])

// Function to return the icon class based on notification type
const notificationIconClass = (type) => {
	switch (type) {
		case 'like':
			return 'bg-blue-500 text-white'
		case 'comment':
			return 'bg-green-500 text-white'
		case 'upload':
			return 'bg-yellow-500 text-white'
		default:
			return 'bg-gray-500 text-white'
	}
}

// Function to return the text class based on notification type
const notificationTextClass = (type) => {
	switch (type) {
		case 'like':
			return 'text-white'
		case 'comment':
			return 'text-white'
		case 'upload':
			return 'text-white'
		default:
			return 'text-gray-800'
	}
}
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>
