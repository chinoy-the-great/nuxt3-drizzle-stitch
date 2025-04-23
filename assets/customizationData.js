// assets/customizationData.js

export const customizationData = {
	top: {
		styles: ['T‑Shirt', 'Sando', 'Blouse', 'Polo Shirt', 'Crop Top'],
		measurements: {
			default: [
				{
					key: 'bust',
					label: 'Bust',
					unit: 'in',
					description: 'Around the fullest part of your bust, comfortable snug but not tight.',
				},
				{
					key: 'armhole',
					label: 'Armhole',
					unit: 'in',
					description: 'Directly under your bust, where your bra band sits.',
				},
				{
					key: 'underbust',
					label: 'Underbust',
					unit: 'in',
					description: 'Around ribcage, just below bust line.',
				},
				{
					key: 'shoulderWidth',
					label: 'Shoulder Width',
					unit: 'in',
					description: 'Point to point across your shoulders at neck base.',
				},
				{
					key: 'sleeveLength',
					label: 'Sleeve Length',
					unit: 'in',
					description: 'Top of shoulder to wrist along outside of arm.',
				},
				{
					key: 'neckline',
					label: 'Neckline',
					unit: 'in',
					description: 'Around the base of your neck, where the collar sits.',
				},
			],
			// override for Sando (no sleeve)
			Sando: [
				{ key: 'bust', label: 'Bust', unit: 'in', description: '...' },
				{ key: 'armhole', label: 'Armhole', unit: 'in', description: '...' },
				{ key: 'underbust', label: 'Underbust', unit: 'in', description: '...' },
				{ key: 'shoulderWidth', label: 'Shoulder Width', unit: 'in', description: '...' },
				{ key: 'neckline', label: 'Neckline', unit: 'in', description: '...' },
			],
		},
		images: {
			default: {
				main: '/assets/images/top/default-main.png',
				side: '/assets/images/top/default-side.png',
			},
			'T‑Shirt': {
				main: '/Pattern_ShortSleeves.png',
				side: '/PatternGuide_ShortSleeves.png',
			},
			Sando: {
				main: '/assets/images/top/sando-main.png',
				side: '/assets/images/top/sando-side.png',
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
			default: [
				{ key: 'waist', label: 'Waist', unit: 'in', description: 'Around the narrowest part of your waist.' },
				{ key: 'hips', label: 'Hips', unit: 'in', description: 'Around the fullest part of your hips.' },
				{ key: 'length', label: 'Length', unit: 'in', description: 'Waist to desired hem.' },
			],
			Shorts: [
				{ key: 'waist', label: 'Waist', unit: 'in', description: '...' },
				{ key: 'hips', label: 'Hips', unit: 'in', description: '...' },
				{
					key: 'shortsLength',
					label: 'Shorts Length',
					unit: 'in',
					description: 'From waist to desired shorts hem.',
				},
			],
			Skirt: [
				{ key: 'waist', label: 'Waist', unit: 'in', description: '...' },
				{ key: 'hips', label: 'Hips', unit: 'in', description: '...' },
				{
					key: 'skirtLength',
					label: 'Skirt Length',
					unit: 'in',
					description: 'From waist to desired skirt hem.',
				},
			],
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
