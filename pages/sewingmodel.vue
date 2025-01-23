<template>
	<div class="flex flex-col items-center justify-center min-h-screen">
		<h1 class="text-2xl font-bold mb-6">3D Model Viewer</h1>
		<div class="flex items-center justify-center bg-white rounded shadow-lg p-4">
			<Vue3dLoader
				:height="500"
				:width="500"
				:show-fps="true"
				:file-path="['/3d_model_machine.fbx']"
				:mtl-path="[null, '/obj/2.mtl', null]"
				:background-color="0xffffff"
			></Vue3dLoader>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { vue3dLoader as Vue3dLoader } from 'vue-3d-loader'

export default defineComponent({
	components: { Vue3dLoader },
})
</script>
