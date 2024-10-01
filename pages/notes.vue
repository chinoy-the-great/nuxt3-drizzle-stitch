<template>
	<div class="max-w-2xl mx-auto p-6 bg-nude-50 rounded-lg shadow-lg">
		<!-- Title -->
		<h1 class="text-3xl font-extrabold text-nude-900 mb-6 text-center">Notes</h1>

		<!-- Input form to add a new note -->
		<div class="mb-6">
			<label for="note-title" class="block text-lg font-medium text-nude-700 mb-2">New Note Title:</label>
			<input
				id="note-title"
				v-model="newNoteTitle"
				type="text"
				class="w-full p-3 border border-nude-300 rounded-lg bg-white focus:outline-none focus:ring focus:ring-nude-500"
				placeholder="Enter the note title..."
			/>

			<label for="note-input" class="block text-lg font-medium text-nude-700 mb-2 mt-4">
				New Note Content:
			</label>
			<textarea
				id="note-input"
				v-model="newNoteContent"
				class="w-full p-3 border border-nude-300 rounded-lg bg-white focus:outline-none focus:ring focus:ring-nude-500"
				rows="4"
				placeholder="Type your note here..."
			></textarea>

			<!-- Add Note Button -->
			<button
				class="mt-4 w-full bg-nude-500 text-white py-2 rounded-lg hover:bg-nude-600 transition duration-200"
				@click="addNote"
			>
				Add Note
			</button>
		</div>

		<!-- List of saved notes with inline editing -->
		<div v-if="notes.length" class="space-y-4">
			<h2 class="text-xl font-bold text-nude-700 mb-4">Your Notes:</h2>
			<div
				v-for="(note, index) in notes"
				:key="index"
				class="border border-nude-300 rounded-lg p-4 bg-white transition-shadow hover:shadow-lg"
			>
				<!-- Editable Note Title -->
				<div class="flex justify-between items-center">
					<div v-if="editingIndex === index">
						<input
							v-model="editNoteTitle"
							type="text"
							class="font-semibold text-lg text-nude-700 w-full p-2 border border-nude-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-nude-500"
						/>
					</div>
					<div v-else>
						<span class="font-semibold text-lg text-nude-700">{{ note.title }}</span>
					</div>

					<!-- Edit and Expand Buttons -->
					<div class="flex space-x-2">
						<button
							class="text-nude-500 hover:text-nude-700"
							@click="editingIndex === index ? saveEdit(index) : editNote(index)"
						>
							{{ editingIndex === index ? 'Save' : 'Edit' }}
						</button>
						<button @click="toggleNoteDetails(index)">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-nude-500"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								:class="{ 'transform rotate-180': activeIndex === index }"
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</button>
					</div>
				</div>

				<!-- Editable Note Content -->
				<div v-if="activeIndex === index" class="mt-2 text-nude-600">
					<div v-if="editingIndex === index">
						<textarea
							v-model="editNoteContent"
							class="w-full p-2 border border-nude-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-nude-500"
							rows="3"
						></textarea>
					</div>
					<div v-else>
						<p>{{ note.content }}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Message when no notes are available -->
		<p v-else class="text-center text-nude-600">No notes added yet. Add your first note above!</p>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// State to hold the new note title and content
const newNoteTitle = ref<string>('')
const newNoteContent = ref<string>('')

// State to hold the list of notes (each note has a title and content)
interface Note {
	title: string
	content: string
}

const notes = ref<Note[]>([])

// State to track the currently expanded note
const activeIndex = ref<number | null>(null)

// State to track if a note is being edited, and hold the edited title/content
const editingIndex = ref<number | null>(null)
const editNoteTitle = ref<string>('')
const editNoteContent = ref<string>('')

// Function to add a new note with a title and content
const addNote = () => {
	if (newNoteTitle.value.trim() && newNoteContent.value.trim()) {
		notes.value.push({
			title: newNoteTitle.value.trim(),
			content: newNoteContent.value.trim(),
		})
		// Clear the input fields
		newNoteTitle.value = ''
		newNoteContent.value = ''
	}
}

// Function to toggle the expanded state of a note
const toggleNoteDetails = (index: number) => {
	activeIndex.value = activeIndex.value === index ? null : index
}

// Function to edit an existing note directly in the view
const editNote = (index: number) => {
	// Load the note content into the editing fields
	editingIndex.value = index
	editNoteTitle.value = notes.value[index].title
	editNoteContent.value = notes.value[index].content
}

// Function to save an edited note
const saveEdit = (index: number) => {
	if (editNoteTitle.value.trim() && editNoteContent.value.trim()) {
		notes.value[index] = {
			title: editNoteTitle.value.trim(),
			content: editNoteContent.value.trim(),
		}
		editingIndex.value = null
	}
}
</script>

<style scoped>
/* No additional styles, Tailwind is being used */
</style>
