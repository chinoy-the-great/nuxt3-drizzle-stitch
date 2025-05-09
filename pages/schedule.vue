<template>
	<div class="bg-white mb-16">
		<!-- Header -->
		<div class="bg-[#ffa5a5] h-16 flex items-center justify-center">
			<h1 class="text-2xl font-semibold text-black">Calendar</h1>
		</div>

		<!-- Schedule List -->
		<div v-for="section in scheduleData" :key="section.date" class="p-6">
			<h2 class="font-semibold text-sm mb-4">{{ section.display }}</h2>
			<ul class="space-y-4">
				<li
					v-for="item in section.items"
					:key="item.id"
					class="flex border-l-4 bg-white rounded"
					:class="item.type === 'event' ? 'border-blue-500' : 'border-yellow-400'"
				>
					<!-- Event -->
					<template v-if="item.type === 'event'">
						<div class="pl-4 py-1 flex flex-col justify-center">
							<div class="flex items-center">
								<span class="text-sm font-medium">{{ item.start }}</span>
								<span class="text-sm ml-2">{{ item.title }}</span>
							</div>
							<div class="flex items-center text-sm text-gray-600 mt-1">
								<span class="text-sm">{{ item.end }}</span>
								<span class="text-sm ml-2">{{ item.location }}</span>
							</div>
						</div>
					</template>
					<!-- Task -->
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
									{{ item.title }}
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

		<!-- Floating + button -->
		<button
			class="fixed bottom-6 right-6 w-12 h-12 rounded-full focus:outline-none new-task-btn mb-16"
			@click="showForm = true"
		></button>

		<!-- Modal Form -->
		<Teleport to="body">
			<div
				v-if="showForm"
				class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
			>
				<div class="bg-white rounded-lg shadow-lg w-full max-w-xs p-3 space-y-2 text-xs">
					<!-- HEADER with bottom border -->
					<div class="flex justify-between items-center border-b border-black pb-2">
						<button class="text-[#f4bbbb] hover:text-[#ff0066]" @click="showForm = false">CANCEL</button>

						<h3 class="font-semibold text-sm text-[#ff0066]">
							NEW {{ form.type === 'event' ? 'EVENT' : 'TASK' }}
						</h3>

						<button
							:disabled="form.type === 'event' && !isEndAfterStart"
							class="text-[#f4bbbb] hover:text-[#ff0066] disabled:opacity-50 disabled:cursor-not-allowed"
							@click="addItem"
						>
							ADD
						</button>
					</div>

					<!-- BODY in original order -->
					<div class="space-y-2">
						<!-- 1) Title -->
						<div class="flex items-center">
							<label class="w-1/3">Title:</label>
							<input v-model="form.title" type="text" class="flex-1 border rounded p-1" />
						</div>

						<!-- 2) Location/Description -->
						<div class="flex items-center">
							<label class="w-1/3">
								{{ form.type === 'event' ? 'Location:' : 'Description:' }}
							</label>
							<input v-model="form.location" type="text" class="flex-1 border rounded p-1" />
						</div>

						<!-- 3) Category -->
						<div class="flex items-center">
							<label class="w-1/3">Category:</label>
							<select v-model="form.type" class="flex-1 border rounded p-1">
								<option value="event">Event</option>
								<option value="task">Task</option>
							</select>
						</div>

						<!-- 4) Notify me -->
						<div class="flex items-center">
							<label class="w-1/3">Notify:</label>
							<select v-model="form.notify" class="flex-1 border rounded p-1">
								<option value="day-before">A day before</option>
								<option value="on-day">On the day</option>
								<option value="hour-before">An hour before</option>
							</select>
						</div>

						<!-- 5) Repeat -->
						<div class="flex items-center">
							<label class="w-1/3">Repeat:</label>
							<select v-model="form.repeat" class="flex-1 border rounded p-1">
								<option value="none">None</option>
								<option value="daily">Every day</option>
								<option value="every-other-day">Every other day</option>
								<option value="weekly">Weekly</option>
							</select>
						</div>

						<!-- 6) All Day as a slider -->
						<div class="flex items-center">
							<span class="w-1/3">All Day:</span>
							<label for="allDay" class="relative inline-flex items-center cursor-pointer">
								<input id="allDay" v-model="form.allDay" type="checkbox" class="sr-only peer" />
								<!-- track -->
								<div
									class="w-9 h-5 bg-gray-300 rounded-full peer-checked:bg-[#ff0066] transition-colors"
								></div>
								<!-- thumb -->
								<div
									class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform"
								></div>
							</label>
						</div>

						<!-- 7) Starts -->
						<div class="flex items-center">
							<label class="w-1/3">Starts:</label>
							<input v-model="form.startDate" type="date" class="border rounded p-1 flex-1" />
							<input
								v-model="form.startTime"
								type="time"
								:disabled="form.allDay"
								class="border rounded p-1 w-20 ml-1"
							/>
						</div>

						<!-- 8) Ends -->
						<div class="flex items-center">
							<label class="w-1/3">Ends:</label>
							<input v-model="form.endDate" type="date" class="border rounded p-1 flex-1" />
							<input
								v-model="form.endTime"
								type="time"
								:disabled="form.allDay"
								class="border rounded p-1 w-20 ml-1"
							/>
						</div>

						<!-- validation msg -->
						<p v-if="form.type === 'event' && !isEndAfterStart" class="text-red-500">
							End must be the same or after the start.
						</p>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

// 1) initial schedule grouped by date
const scheduleData = ref([
	{
		date: '2025-03-01',
		display: 'Monday 03/01/25',
		items: [
			{
				id: 1,
				type: 'event',
				title: '2nd Lecture',
				start: '9:00 AM',
				end: '10:00 AM',
				location: 'Event Hall',
			},
			{
				id: 2,
				type: 'task',
				title: 'Watch Video',
				description: 'How to Set Up Sewing Machine',
				done: false,
			},
			{
				id: 3,
				type: 'event',
				title: 'Consultation',
				start: '1:00 PM',
				end: '3:00 PM',
				location: 'Prof. Office',
			},
		],
	},
	{
		date: '2025-04-10',
		display: 'Thursday 04/10/25',
		items: [
			{
				id: 5,
				type: 'task',
				title: 'Write Summary',
				description: 'Chapters 1–2',
				done: false,
			},
		],
	},
])

// 2) controls modal visibility
const showForm = ref(false)

// 3) form state
const form = reactive({
	title: '',
	location: '',
	type: 'event', // event or task
	notify: 'day-before', // a day before, on the day, hour before
	repeat: 'none', // none, daily, every-other-day, weekly
	allDay: false,
	startDate: new Date().toISOString().substr(0, 10),
	startTime: '09:00',
	endDate: new Date().toISOString().substr(0, 10),
	endTime: '10:00',
})

// 4) parse start/end into real Date objects
const startDateTime = computed(() => {
	if (form.allDay) return new Date(`${form.startDate}T00:00`)
	return new Date(`${form.startDate}T${form.startTime}`)
})
const endDateTime = computed(() => {
	if (form.allDay) return new Date(`${form.endDate}T23:59`)
	return new Date(`${form.endDate}T${form.endTime}`)
})

// 5) validation: end must not be before start
const isEndAfterStart = computed(() => endDateTime.value >= startDateTime.value)

// helper: “HH:MM” → “h:MM AM/PM”
function formatTime(hm) {
	const [h, m] = hm.split(':').map(Number)
	const ampm = h >= 12 ? 'PM' : 'AM'
	const hour = ((h + 11) % 12) + 1
	return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

// 6) add a new item on “Add”
function addItem() {
	if (!isEndAfterStart.value) return

	// find or create the proper date section
	let section = scheduleData.value.find((s) => s.date === form.startDate)
	if (!section) {
		const d = new Date(form.startDate)
		const weekday = d.toLocaleDateString('en-US', { weekday: 'long' })
		const MM = String(d.getMonth() + 1).padStart(2, '0')
		const DD = String(d.getDate()).padStart(2, '0')
		const YY = String(d.getFullYear() % 100).padStart(2, '0')
		section = {
			date: form.startDate,
			display: `${weekday} ${MM}/${DD}/${YY}`,
			items: [],
		}
		scheduleData.value.push(section)
		// keep date sections sorted
		scheduleData.value.sort((a, b) => (a.date < b.date ? -1 : 1))
	}

	// generate new unique ID
	const allIds = scheduleData.value.flatMap((s) => s.items.map((i) => i.id))
	const newId = (allIds.length ? Math.max(...allIds) : 0) + 1

	// push event or task
	if (form.type === 'event') {
		section.items.push({
			id: newId,
			type: 'event',
			title: form.title,
			start: form.allDay ? '12:00 AM' : formatTime(form.startTime),
			end: form.allDay ? '11:59 PM' : formatTime(form.endTime),
			location: form.location,
		})
	} else {
		section.items.push({
			id: newId,
			type: 'task',
			title: form.title,
			description: form.location,
			done: false,
		})
	}

	// close the form
	showForm.value = false
}
</script>

<style scoped>
.new-task-btn {
	/* center & size your icon */
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;

	/* default icon */
	background-image: url('/Tracker_Task_Black.png');
}

.new-task-btn:hover {
	/* hover icon */
	background-image: url('/Tracker_Task_Pink.png');
}
</style>
