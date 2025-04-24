// assets/customizationData.js

export const customizationData = {
	top: {
		styles: ['T‑Shirt', 'Sando', 'Blouse', 'Polo Shirt', 'Crop Top'],
		measurements: {
			default: ['bust', 'armhole', 'underbust', 'shoulderWidth', 'sleeveLength', 'neckline'],
			Sando: ['bust', 'armhole', 'underbust', 'shoulderWidth', 'neckline'],
		},
		images: {
			default: {
				main: '/assets/images/top/default-main.png',
				side: '/assets/images/top/default-side.png',
			},
			'T‑Shirt': {
				main: '/Pattern_TShirt.jpg',
				side: '/PatternGuide_TShirt.png',
			},
			Sando: {
				main: '/Pattern_Sando.jpg',
				side: '/PatternGuide_Sando.png',
			},
			Blouse: {
				main: '/assets/images/top/blouse-main.png',
				side: '/assets/images/top/blouse-side.png',
			},
			'Polo Shirt': {
				main: '/assets/images/top/polo-main.png',
				side: '/assets/images/top/polo-side.png',
			},
			'Crop Top': {
				main: '/assets/images/top/crop-main.png',
				side: '/assets/images/top/crop-side.png',
			},
		},
	},

	bottom: {
		styles: ['Shorts', 'Pants', 'Skirt'],
		measurements: {
			default: ['waist', 'hips', 'length'],
			Shorts: ['waist', 'hips', 'shortsLength'],
			Skirt: ['waist', 'hips', 'skirtLength'],
		},
		images: {
			default: {
				main: '/assets/images/bottom/default-main.png',
				side: '/assets/images/bottom/default-side.png',
			},
			Shorts: {
				main: '/assets/images/bottom/shorts-main.png',
				side: '/assets/images/bottom/shorts-side.png',
			},
			Pants: {
				main: '/assets/images/bottom/pants-main.png',
				side: '/assets/images/bottom/pants-side.png',
			},
			Skirt: {
				main: '/assets/images/bottom/skirt-main.png',
				side: '/assets/images/bottom/skirt-side.png',
			},
		},
	},
}
