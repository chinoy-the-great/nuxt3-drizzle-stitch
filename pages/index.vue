<template>
	<div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
	// Redirect immediately when the page loads
	navigateTo('/login')
})
</script>
