<template>
	<div class="flex flex-col items-center justify-center min-h-screen mb-8 pt-4">
		<div class="flex flex-col items-start justify-start w-full max-w-5xl mx-auto px-4">
			<h1 class="text-2xl font-semibold mt-2 mb-2 text-left">3D Sewing Machine</h1>
			<div class="w-full flex items-center justify-center bg-transparent rounded shadow-lg">
				<Vue3dLoader
					:height="500"
					:width="500"
					:file-path="['/3d_model_machine.fbx']"
					:mtl-path="[null, '/obj/2.mtl', null]"
					:background-color="0xadd8e6"
				/>
			</div>
		</div>

		<div class="w-full">
			<!-- Header Tabs -->
			<div class="flex justify-around bg-gray-100 shadow-md border-b border-gray-300 mb-4 w-full">
				<div
					v-for="tab in tabs"
					:key="tab"
					class="relative py-2 cursor-pointer text-xs font-normal text-gray-700 w-full text-center"
					@click="selectedTab = tab"
				>
					{{ tab }}
					<!-- Black underline if selected -->
					<div
						v-if="selectedTab === tab"
						class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-[2px] bg-black rounded-full"
					></div>
				</div>
			</div>

			<!-- Tab Content -->
			<div class="px-4 text-sm text-gray-800 min-h-[150px]">
				<div v-if="selectedTab === 'History'">
					<p>
						This sewing machine is called a treadle sewing machine. It doesn’t use electricity. Instead, it
						works when you press a foot pedal (called a treadle), which moves up and down to run the machine.
						This made sewing much faster and easier than doing it by hand.
						<br />
						<br />
						Sewing machines were first invented in the early 1800s, but it was Isaac Singer in the 1850s who
						made a model that became very popular. His design used a straight needle and was powered by a foot
						pedal. These machines became common in homes and small tailoring shops because they were
						affordable, simple to use, and didn’t need electricity.
						<br />
						<br />
						From the late 1800s to early 1900s, many families had treadle machines in their homes. People used
						them to sew clothes, curtains, table covers, and school uniforms. They were not only useful but
						also beautifully made, often with metal stands and wooden cabinets, making them look like pieces
						of furniture.
						<br />
						<br />
						Even now, some people still use these machines, especially in places where electricity isn’t
						always available. They are known for being strong, durable, and easy to fix. Many people also
						enjoy them for their classic style and smooth stitching.
					</p>
				</div>
				<div v-else-if="selectedTab === 'Sewing Machine Parts'">
					<ul class="list-disc list-inside">
						<li>
							<strong>Spool Spin:</strong>
							During stitching the spool of thread is held in place by a spool pin.
						</li>
						<li>
							<strong>Stitch Regulator:</strong>
							This pin holds the spool of thread and allows it to unwind while sewing.
						</li>
						<li>
							<strong>Bobbin Winder:</strong>
							Is used to wind thread evenly onto the bobbin, which is a small spool that supplies the lower
							thread during sewing, but the bobbin winder here is no longer used, I just want you to know
							where is the bobbin winder located.
						</li>
						<li>
							<strong>Balance Wheel:</strong>
							Used to control the needle’s movement, by turning the wheel the user can manually raise or lower
							the needle.
						</li>
						<li>
							<strong>Stop Motion Knob:</strong>
							Also known as the clutch knob, is a small, adjustable component located on the handwheel or
							balance wheel of a sewing machine. And when the knob is tightened, the needle and feed dogs move
							as the handwheel rotates, enabling sewing. When the knob is loosened, the needle stops moving,
							but the handwheel continues to drive the bobbin winder.
						</li>
						<li>
							<strong>Presser Bar Lifter:</strong>
							Is used to control the position of the presser foot, and it is used to raise or lower the
							presser foot, allowing the user to handle fabric effectively during sewing.
						</li>
						<li>
							<strong>Thread Guide:</strong>
							It is used to control the path of the thread as it moves from the spool to the needle.
						</li>
						<li>
							<strong>Thread Take-up Lever:</strong>
							Is to control thread tension and to regulate the flow of the upper thread and work together with
							other parts of the sewing machine. Without this sewing would be prone to issues like loose
							threads, uneven stitches, and thread breakage.
						</li>
						<li>
							<strong>Tension Regulator:</strong>
							Is an essential component that ensures the thread is fed at the correct tightness, enabling
							smooth stitching.
						</li>
						<li>
							<strong>Thread Guide 2:</strong>
							It is a second point in the threading path that helps guide the upper thread from the spool
							towards the needle.
						</li>
						<li>
							<strong>Needle Clamp:</strong>
							Is to hold the sewing machine needle securely in place during operation.
						</li>
						<li>
							<strong>Hook:</strong>
							Its primary purpose is to catch the upper thread as the needle moves down and interlock it with
							the bobbin thread, forming a stitch.
						</li>
						<li>
							<strong>Needle:</strong>
							Is the primary tool for creating stitches.
						</li>
						<li>
							<strong>Presser Foot:</strong>
							It holds the fabric firmly, and ensures that the fabric moves evenly under the needle,
							preventing it from shifting or bunching, which could result in uneven stitching or fabric
							damage.
						</li>
						<li>
							<strong>Feed Dog:</strong>
							It works in coordination with the presser foot, which holds the fabric in place, and the needle,
							which form the stitches.
						</li>
						<li>
							<strong>Slide Plate:</strong>
							It serves as a protective cover for the bobbin and other internal mechanisms.
						</li>
						<li>
							<strong>Throat Plate:</strong>
							It provides a protection to the sewing machines internal, and to support the fabric as it moves
							through the sewing machine.
						</li>
						<li>
							<strong>Bobbin Case:</strong>
							Is to securely hold the bobbin thread in place.
						</li>
						<li>
							<strong>Bobbin Thread:</strong>
							Is the lower thread that works together with the upper thread to create stitches.
						</li>
						<li>
							<strong>Treadle:</strong>
							It allows the user to control the speed of sewing, by pressing the treadle with their feet in a
							back and forth motion.
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { vue3dLoader as Vue3dLoader } from 'vue-3d-loader'

definePageMeta({
	layout: 'window',
})

const tabs = ['History', 'Sewing Machine Parts']
const selectedTab = ref('History')
</script>
