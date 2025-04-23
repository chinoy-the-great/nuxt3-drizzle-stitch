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
			class="fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-3xl leading-none hover:bg-gray-800 focus:outline-none mb-16"
			@click="showForm = true"
		>
			+
		</button>

		<!-- Modal Form -->
		<Teleport to="body">
			<div
				v-if="showForm"
				class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
			>
				<div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
					<!-- Header -->
					<div class="flex justify-between items-center">
						<button class="text-gray-500 hover:text-gray-700" @click="showForm = false">Cancel</button>
						<h3 class="text-lg font-semibold">New {{ form.type === 'event' ? 'Event' : 'Task' }}</h3>
						<button
							:disabled="!isEndAfterStart"
							class="text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
							@click="addItem"
						>
							Add
						</button>
					</div>

					<!-- Form Fields -->
					<div class="space-y-4 text-sm">
						<!-- Title -->
						<div>
							<label class="block mb-1">Title</label>
							<input v-model="form.title" type="text" class="w-full border rounded p-2" />
						</div>
						<!-- Location / Description -->
						<div>
							<label class="block mb-1">
								{{ form.type === 'event' ? 'Location' : 'Description' }}
							</label>
							<input v-model="form.location" type="text" class="w-full border rounded p-2" />
						</div>
						<!-- Category -->
						<div>
							<label class="block mb-1">Category</label>
							<select v-model="form.type" class="w-full border rounded p-2">
								<option value="event">Event</option>
								<option value="task">Task</option>
							</select>
						</div>
						<!-- Notify me -->
						<div>
							<label class="block mb-1">Notify me</label>
							<select v-model="form.notify" class="w-full border rounded p-2">
								<option value="day-before">A day before</option>
								<option value="on-day">On the day</option>
								<option value="hour-before">An hour before</option>
							</select>
						</div>
						<!-- Repeat -->
						<div>
							<label class="block mb-1">Repeat</label>
							<select v-model="form.repeat" class="w-full border rounded p-2">
								<option value="none">None</option>
								<option value="daily">Every day</option>
								<option value="every-other-day">Every other day</option>
								<option value="weekly">Weekly</option>
							</select>
						</div>
						<!-- All Day -->
						<div class="flex items-center">
							<input id="allDay" v-model="form.allDay" type="checkbox" class="mr-2" />
							<label for="allDay">All Day</label>
						</div>
						<!-- Starts -->
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block mb-1">Starts (Date)</label>
								<input v-model="form.startDate" type="date" class="w-full border rounded p-2" />
							</div>
							<div>
								<label class="block mb-1">Starts (Time)</label>
								<input
									v-model="form.startTime"
									type="time"
									:disabled="form.allDay"
									class="w-full border rounded p-2"
								/>
							</div>
						</div>
						<!-- Ends -->
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block mb-1">Ends (Date)</label>
								<input v-model="form.endDate" type="date" class="w-full border rounded p-2" />
							</div>
							<div>
								<label class="block mb-1">Ends (Time)</label>
								<input
									v-model="form.endTime"
									type="time"
									:disabled="form.allDay"
									class="w-full border rounded p-2"
								/>
							</div>
						</div>
						<!-- Validation Error -->
						<p v-if="!isEndAfterStart" class="text-red-500 text-sm mt-1">
							End date/time must be the same or after the start.
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
