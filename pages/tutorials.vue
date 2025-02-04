<template>
	<div class="max-w-4xl mx-auto p-6 mb-8 bg-nude-50 rounded-lg shadow-lg">
		<!-- List of Videos -->
		<div v-for="(video, index) in videos" :key="index" class="mb-8 bg-[#b9445f] rounded-lg p-4 pb-1">
			<div class="flex items-center">
				<!-- Video Thumbnail (1/2 width) -->
				<div class="w-1/2 pr-4">
					<iframe
						:src="`https://www.youtube.com/embed/${video.id}`"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						class="w-full h-32 rounded-lg"
					></iframe>
				</div>

				<!-- Video Title and Description (1/2 width) -->
				<div class="w-1/2">
					<h3 class="text-2xl font-semibold text-white mt-2">{{ video.title }}</h3>
					<p class="text-white text-lg mt-1">{{ video.description }}</p>
				</div>
			</div>

			<!-- Comments Section -->
			<div class="mt-6">
				<div class="flex justify-between items-center">
					<h4 class="text-lg text-white font-semibold mb-2">Comments ({{ video.comments.length }})</h4>
					<button class="text-white hover:text-gray-300 transition" @click="toggleComments(video)">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path v-if="video.showComments" d="M19 9l-7 7-7-7" />
							<path v-else d="M12 15l7-7-7-7" />
						</svg>
					</button>
				</div>

				<!-- Collapsible Comments -->
				<div v-show="video.showComments" class="space-y-2 mb-4">
					<!-- Existing Comments -->
					<div
						v-for="(comment, commentIndex) in video.comments"
						:key="commentIndex"
						class="bg-white p-3 rounded-lg"
					>
						<p class="font-semibold text-gray-800">{{ comment.user }}:</p>
						<p class="text-gray-600">{{ comment.text }}</p>
					</div>

					<!-- Comment Form (Inside Collapsible Section) -->
					<div>
						<input
							v-model="video.newComment.user"
							type="text"
							placeholder="Your name"
							class="w-full p-2 mb-2 border rounded-lg"
						/>
						<textarea
							v-model="video.newComment.text"
							placeholder="Add a comment..."
							class="w-full p-2 mb-2 border rounded-lg"
							rows="3"
						></textarea>
						<button
							class="w-full bg-[#381816] text-white py-2 rounded-lg hover:bg-nude-800 transition"
							@click="addComment(video, index)"
						>
							Add Comment
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Array of video details with comments section
const videos = ref([
	{
		id: 'tBudnRKg_r8',
		title: 'Video Tutorial 1',
		description: 'Description for video tutorial 1.',
		comments: [
			{ user: 'Alice', text: 'Great tutorial, thanks!' },
			{ user: 'Bob', text: 'Very informative, I learned a lot.' },
		],
		newComment: { user: '', text: '' }, // Store the new comment input
		showComments: false, // Collapsible section visibility
	},
	{
		id: 'OpNU-PRxMqE',
		title: 'Video Tutorial 2',
		description: 'Description for video tutorial 2.',
		comments: [],
		newComment: { user: '', text: '' },
		showComments: false,
	},
	{
		id: 'KDvK_q7ohaE',
		title: 'Video Tutorial 3',
		description: 'Description for video tutorial 3.',
		comments: [],
		newComment: { user: '', text: '' },
		showComments: false,
	},
])

// Method to toggle the visibility of the comments section
const toggleComments = (video) => {
	video.showComments = !video.showComments
}

// Method to add a comment to the video
const addComment = (video, index) => {
	console.log('Adding comment to video at index:', index)
	if (video.newComment.user && video.newComment.text) {
		// Add the new comment to the video's comment array
		video.comments.push({
			user: video.newComment.user,
			text: video.newComment.text,
		})
		// Reset the input fields after adding the comment
		video.newComment.user = ''
		video.newComment.text = ''
	}
}
</script>

<style scoped>
/* Style adjustments for the video aspect ratio */
.aspect-w-16 {
	position: relative;
	width: 100%;
}

.aspect-h-9 {
	padding-top: 56.25%; /* Aspect ratio for 16:9 */
}

.aspect-w-16 iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
