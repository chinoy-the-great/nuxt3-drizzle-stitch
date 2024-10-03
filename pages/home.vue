<template>
	<div>
		<h1>List of Registered Users</h1>
		<ul>
			<li v-for="user in data?.users" :key="user.id">{{ user.name }} - {{ user.email }}</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
const { data } = await useFetch('/api/users')
</script>
