// src/assets/measurementCoordinates.js
// Percentages are relative to the <div class="relative"> box
// Omits sleeveLength on the Sando as requested.

export const measurementCoordinates = {
	Blouse: {
		front: {
			bust: { x: 32, y: 53 },
			armhole: { x: 17, y: 24 },
			underbust: { x: 32, y: 69 },
			shoulderWidth: { x: 69, y: 18 },
			sleeveLength: { x: 50, y: 72 }, // At the dashed sleeve-length arrow
			neckline: { x: 31, y: 19 }, // At the top neckline arrow
			// shoulderWidth intentionally left off front
		},
		back: {
			bust: { x: 50, y: 45 }, // Chest arrow across mid-back
			shoulderWidth: { x: 50, y: 12 }, // Top dashed shoulder arrow
		},
	},
	'Crop Top': {
		front: {
			bust: { x: 31, y: 48 },
			armhole: { x: 17, y: 24 },
			underbust: { x: 31, y: 61 },
			shoulderWidth: { x: 69, y: 20 },
			sleeveLength: { x: 50, y: 72 },
			neckline: { x: 31, y: 20 },
		},
		back: {
			bust: { x: 55, y: 48 },
			shoulderWidth: { x: 55, y: 12 },
		},
	},
	'Polo Shirt': {
		front: {
			bust: { x: 31, y: 53 },
			armhole: { x: 17, y: 24 },
			underbust: { x: 31, y: 69 },
			shoulderWidth: { x: 69, y: 20 },
			sleeveLength: { x: 50, y: 72 },
			neckline: { x: 31, y: 20 },
		},
		back: {
			bust: { x: 53, y: 48 },
		},
	},
	Sando: {
		front: {
			bust: { x: 31, y: 55 },
			armhole: { x: 18, y: 28 },
			underbust: { x: 31, y: 69 },
			shoulderWidth: { x: 68, y: 23 },
			neckline: { x: 31, y: 23 },
		},
		back: {
			bust: { x: 55, y: 50 },
		},
	},
	'T-Shirt': {
		front: {
			bust: { x: 31, y: 53 },
			armhole: { x: 17, y: 24 },
			underbust: { x: 31, y: 69 },
			shoulderWidth: { x: 69, y: 20 },
			sleeveLength: { x: 50, y: 72 },
			neckline: { x: 31, y: 20 },
		},
		back: {
			bust: { x: 53, y: 48 },
			shoulderWidth: { x: 53, y: 12 },
		},
	},
	Shorts: {
		front: {
			waist: { x: 31, y: 27 },
			hips: { x: 31, y: 48 },
			thighWidth: { x: 22, y: 89 },
			shortsLength: { x: 62, y: 87 },
		},
		back: {},
	},
	Skirt: {
		front: {
			waist: { x: 49, y: 31 },
			hips: { x: 49, y: 60 },
			thighWidth: { x: 49, y: 97 },
			skirtLength: { x: 20, y: 60 },
		},
		back: {},
	},
	Pants: {
		front: {
			waist: { x: 41, y: 18 },
			thighWidth: { x: 46, y: 52 },
			hips: { x: 41, y: 37 },
			kneeWidth: { x: 46, y: 70 },
			inseam: { x: 33, y: 63 },
			pantsLength: { x: 79, y: 60 },
		},
		back: {},
	},
}
