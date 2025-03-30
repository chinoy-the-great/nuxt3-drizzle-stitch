<template>
	<div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

definePageMeta({
	layout: 'fullscreen', // Uses fullscreen layout instead of default
})

onMounted(() => {
	// Redirect immediately when the page loads
	navigateTo('/welcome')
})
</script>
