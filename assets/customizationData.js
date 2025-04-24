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
				main: '/Pattern_TShirt.png',
				side: '/PatternGuide_TShirt.png',
			},
			Sando: {
				main: '/Pattern_Sando.png',
				side: '/PatternGuide_Sando.png',
			},
			Blouse: {
				main: '/Pattern_Blouse.png',
				side: '/PatternGuide_Blouse.png',
			},
			'Polo Shirt': {
				main: '/Pattern_PoloShirt.png',
				side: '/PatternGuide_PoloShirt.png',
			},
			'Crop Top': {
				main: '/Pattern_CropTop.png',
				side: '/PatternGuide_CropTop.png',
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
				main: '/Pattern_Shorts.png',
				side: '/PatternGuide_Shorts.png',
			},
			Pants: {
				main: '/Pattern_Pants.png',
				side: '/PatternGuide_Pants.png',
			},
			Skirt: {
				main: '/Pattern_Skirt.png',
				side: '/PatternGuide_Skirt.png',
			},
		},
	},
}
