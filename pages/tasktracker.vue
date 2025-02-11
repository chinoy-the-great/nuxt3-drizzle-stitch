<template>
	<div class="container mx-auto p-4 mb-8 mt-8">
		<h1 class="text-3xl font-semibold text-center mb-6">January 2025</h1>

		<!-- Days of the week (Header row) -->
		<div class="grid grid-cols-7 gap-0">
			<div class="day-cell">SUN</div>
			<div class="day-cell">MON</div>
			<div class="day-cell">TUE</div>
			<div class="day-cell">WED</div>
			<div class="day-cell">THU</div>
			<div class="day-cell">FRI</div>
			<div class="day-cell">SAT</div>
		</div>

		<!-- Calendar Grid -->
		<div class="grid grid-cols-7 gap-0">
			<!-- Loop through the days and display the numbered days -->
			<div
				v-for="(day, index) in calendarDays"
				:key="index"
				class="flex items-center justify-center cursor-pointer hover:bg-gray-200"
				:class="{
					'bg-white text-lg font-semibold border-2 border-black': day !== null, // Valid days with border and text
					'bg-white border-2 border-black': day === null, // Empty cells still have white background and black border
				}"
			>
				<div v-if="day" class="w-16 h-16 flex items-center justify-center">
					{{ day }}
				</div>
				<!-- Blank cell for empty days -->
				<div v-else class="w-16 h-16"></div>
			</div>
		</div>

		<!-- Task Modal -->
		<div v-if="isModalOpen" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
			<div class="bg-white p-6 rounded-lg shadow-lg w-96">
				<h3 class="text-lg font-bold text-center mb-4">Tasks for {{ selectedDay }}</h3>

				<!-- Task Input -->
				<input
					v-model="newTask"
					type="text"
					placeholder="Enter a new task"
					class="w-full p-2 border rounded-lg mb-4"
				/>

				<!-- Add Task Button -->
				<button class="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-4" @click="addTask">
					Add Task
				</button>

				<!-- List of Tasks -->
				<div v-if="tasks[selectedDay] && tasks[selectedDay].length > 0">
					<h4 class="font-semibold text-lg mb-2">Tasks:</h4>
					<ul>
						<li
							v-for="(task, index) in tasks[selectedDay]"
							:key="index"
							class="flex justify-between items-center p-2 border-b"
						>
							<span>{{ task }}</span>
							<button class="text-red-500 hover:text-red-700" @click="removeTask(selectedDay, index)">
								Remove
							</button>
						</li>
					</ul>
				</div>

				<!-- Close Modal Button -->
				<div class="flex justify-between">
					<button class="bg-red-500 text-white px-4 py-2 rounded-lg w-full" @click="closeTaskModal">
						Close
					</button>
				</div>
			</div>
		</div>

		<div class="flex overflow-x-auto space-x-6 mb-6 p-4">
			<!-- First Icon (Fabric Guide) -->
			<!-- First Icon (Fabric Guide) with White Box -->
			<!-- First Icon (Fabric Guide) with White Box -->
			<div class="flex w-full justify-between space-x-4">
				<!-- First Icon (Tasks) -->
				<div
					class="bg-[#b9445f] rounded-lg p-2 inline-flex items-center justify-center w-1/2 flex-shrink-0 flex-col"
				>
					<p class="text-center text-base font-semibold colored-icon text-white">Set a Task</p>
					<img
						src="/public/Tasks_Icon.png"
						alt="Tasks Icon"
						class="h-30 object-contain cursor-pointer flex-shrink-0 filter invert"
					/>
				</div>

				<!-- Second Icon (Notes) -->
				<NuxtLink
					to="/notes"
					class="bg-[#b9445f] rounded-lg p-2 inline-flex items-center justify-center w-1/2 flex-shrink-0 flex-col"
				>
					<p class="text-center text-base font-semibold colored-icon text-white">Your Notes</p>
					<img
						src="/public/Notes_Icon.png"
						alt="Notes Icon"
						class="h-30 object-contain cursor-pointer flex-shrink-0 filter invert"
					/>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			month: new Date().getMonth(), // Current month (0-11)
			year: new Date().getFullYear(), // Current year
			selectedDay: null,
			newTask: '',
			isModalOpen: false,
			tasks: {}, // Store tasks for each day (key: day number, value: array of tasks)
		}
	},
	computed: {
		// Get the name of the current month (e.g., 'January', 'February', etc.)
		monthName() {
			return new Date(this.year, this.month).toLocaleString('default', { month: 'long' })
		},
		// Generate the days for the calendar
		calendarDays() {
			const daysInMonth = new Date(this.year, this.month + 1, 0).getDate()
			const firstDay = new Date(this.year, this.month, 1).getDay() // 0 for Sunday, 6 for Saturday
			const days = []

			// Fill in empty slots before the first day
			for (let i = 0; i < firstDay; i++) {
				days.push(null) // Empty cell for the days before the first day
			}

			// Add days of the month
			for (let day = 1; day <= daysInMonth; day++) {
				days.push(day)
			}

			// Fill in empty slots after the last day
			while (days.length < 42) {
				days.push(null) // Empty cell for the days after the last day
			}

			return days
		},
	},
	methods: {
		// Open the task modal for a selected day
		openTaskModal(day) {
			this.selectedDay = day
			this.newTask = '' // Clear the task input
			this.isModalOpen = true
		},

		// Close the task modal
		closeTaskModal() {
			this.isModalOpen = false
		},

		// Add the task to the selected day
		addTask() {
			if (this.newTask.trim()) {
				// Initialize task array if it doesn't exist for the selected day
				if (!this.tasks[this.selectedDay]) {
					this.$set(this.tasks, this.selectedDay, [])
				}

				// Add the task to the selected day's task list
				this.tasks[this.selectedDay].push(this.newTask.trim())
				this.newTask = '' // Clear the task input
			}
		},

		// Remove a specific task from the list
		removeTask(day, index) {
			this.tasks[day].splice(index, 1)
			if (this.tasks[day].length === 0) {
				// If no tasks are left for the day, delete the day entry
				this.$delete(this.tasks, day)
			}
		},
	},
}
</script>

<style scoped>
.day-cell {
	@apply text-center font-semibold text-black bg-pink-100 p-3 border border-black;
}
</style>
