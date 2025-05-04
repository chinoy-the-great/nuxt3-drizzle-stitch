<template>
	<div>
		<!-- Header Tabs -->
		<div class="flex justify-around bg-gray-100 shadow-md border-b border-gray-300 mb-4">
			<div
				v-for="tab in tabs"
				:key="tab"
				class="relative py-2 cursor-pointer text-xs font-normal text-gray-700 w-full text-center"
				:class="{ 'font-semibold': selectedTab === tab }"
				@click="selectedTab = tab"
			>
				{{ tab }}
				<div
					v-if="selectedTab === tab"
					class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-[2px] bg-black rounded-full"
				></div>
			</div>
		</div>

		<!-- Tab Contents -->
		<div class="px-4">
			<p v-if="currentTasks.length === 0" class="text-sm text-gray-500">
				No {{ selectedTab.toLowerCase() }} assignments.
			</p>
			<ul v-else class="space-y-3">
				<li
					v-for="task in currentTasks"
					:key="task.id"
					class="flex justify-between items-center p-3 border rounded"
				>
					<div>
						<p class="font-medium">{{ task.title }}</p>
						<p class="text-xs text-gray-500">
							Due: {{ formatDate(task.dueDate) }}
							<span v-if="isOverdue(task)" class="text-red-500">(overdue)</span>
						</p>
					</div>
					<button
						v-if="selectedTab !== 'Done'"
						class="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
						@click="markDone(task.id)"
					>
						Mark Done
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// 1) Tabs
const tabs = ['Assigned', 'Missing', 'Done'] as const
const selectedTab = ref<(typeof tabs)[number]>('Assigned')

// 2) Data & dates
interface Assignment {
	id: number
	title: string
	dueDate: string // YYYY-MM-DD
	completed: boolean
}
const today = new Date()
const iso = (d: Date) => d.toISOString().substr(0, 10)
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

// 3) Sewing-related assignments
const assignments = ref<Assignment[]>([
	// overdue → Missing
	{ id: 1, title: 'Create Dress Outline', dueDate: '2024-06-20', completed: false },

	// due today & tomorrow → Assigned
	{ id: 2, title: 'Practice Sewing Techniques', dueDate: iso(today), completed: false },
	{ id: 3, title: 'Practice Fabric Cutting', dueDate: iso(tomorrow), completed: false },

	// already done → Done
	{ id: 4, title: 'Alter Shirt', dueDate: '2024-06-10', completed: true },
])

// 4) Helpers & computed lists
const startOfToday = new Date(new Date().setHours(0, 0, 0, 0))
function isOverdue(a: Assignment) {
	return !a.completed && new Date(a.dueDate) < startOfToday
}

const assignedTasks = computed(() => assignments.value.filter((a) => !a.completed && !isOverdue(a)))
const missingTasks = computed(() => assignments.value.filter((a) => !a.completed && isOverdue(a)))
const doneTasks = computed(() => assignments.value.filter((a) => a.completed))

const currentTasks = computed(() => {
	if (selectedTab.value === 'Assigned') return assignedTasks.value
	if (selectedTab.value === 'Missing') return missingTasks.value
	return doneTasks.value
})

// 5) Actions & formatting
function markDone(id: number) {
	const t = assignments.value.find((x) => x.id === id)
	if (t) t.completed = true
}

function formatDate(isoStr: string) {
	return new Intl.DateTimeFormat('default', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(new Date(isoStr))
}
</script>

<style scoped>
/* …your styles… */
</style>
