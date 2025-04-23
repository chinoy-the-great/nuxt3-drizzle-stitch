// assets/customizationData.js

/**
 * For each garmentType we list:
 *  - styles: the array of style names
 *  - measurements: an object with
 *      • a `default` array of measurement‐fields
 *      • zero or more per‐style overrides
 */
export const customizationData = {
	top: {
		styles: ['T‑Shirt', 'Sando', 'Blouse', 'Polo Shirt', 'Crop Top'],
		measurements: {
			// used for all top styles unless overridden below
			default: [
				{
					key: 'bust',
					label: 'Bust',
					unit: 'inches',
					description: 'Around the fullest part of your bust, comfortable snug but not tight.',
				},
				{
					key: 'armhole',
					label: 'Armhole',
					unit: 'inches',
					description: 'Directly under your bust, where the band of your bra sits.',
				},
				{
					key: 'underbust',
					label: 'Underbust',
					unit: 'inches',
					description: 'Around the ribcage, just below your bust line, snug but comfortable.',
				},
				{
					key: 'shoulderWidth',
					label: 'Shoulder Width',
					unit: 'inches',
					description: 'Point to point, across the top of your shoulders at the base of neck.',
				},
				{
					key: 'sleeveLength',
					label: 'Sleeve Length',
					unit: 'inches',
					description: 'From top of shoulder down outside of arm to desired hem (wrist).',
				},
				{
					key: 'neckline',
					label: 'Neckline',
					unit: 'inches',
					description: 'Around the base of your neck, where the collar would sit.',
				},
			],
			// Sando / tank‐top → no sleeve measurement
			Sando: [
				{
					key: 'bust',
					label: 'Bust',
					unit: 'inches',
					description: 'Around the fullest part of your bust, comfortable snug but not tight.',
				},
				{
					key: 'armhole',
					label: 'Armhole',
					unit: 'inches',
					description: 'Directly under your bust, where the band of your bra sits.',
				},
				{
					key: 'underbust',
					label: 'Underbust',
					unit: 'inches',
					description: 'Around the ribcage, just below your bust line.',
				},
				{
					key: 'shoulderWidth',
					label: 'Shoulder Width',
					unit: 'inches',
					description: 'Point to point across the top of your shoulders at the base of neck.',
				},
				{
					key: 'neckline',
					label: 'Neckline',
					unit: 'inches',
					description: 'Around the base of your neck, where the collar would sit.',
				},
			],
		},
	},

	bottom: {
		styles: ['Shorts', 'Pants', 'Skirt'],
		measurements: {
			default: [
				{
					key: 'waist',
					label: 'Waist',
					unit: 'inches',
					description: 'Around the narrowest part of your waist, above your hip bones.',
				},
				{
					key: 'hips',
					label: 'Hips',
					unit: 'inches',
					description: 'Around the fullest part of your hips and buttocks.',
				},
				{
					key: 'length',
					label: 'Total Length',
					unit: 'inches',
					description: 'From waist down to desired hem (knee, ankle, etc.).',
				},
			],
			Shorts: [
				{
					key: 'waist',
					label: 'Waist',
					unit: 'inches',
					description: 'Around the narrowest part of your waist, above your hip bones.',
				},
				{
					key: 'hips',
					label: 'Hips',
					unit: 'inches',
					description: 'Around the fullest part of your hips and buttocks.',
				},
				{
					key: 'shortsLength',
					label: 'Shorts Length',
					unit: 'inches',
					description: 'From waist to desired shorts hem.',
				},
			],
			Skirt: [
				{
					key: 'waist',
					label: 'Waist',
					unit: 'inches',
					description: 'Around the narrowest part of your waist, above your hip bones.',
				},
				{
					key: 'hips',
					label: 'Hips',
					unit: 'inches',
					description: 'Around the fullest part of your hips and buttocks.',
				},
				{
					key: 'skirtLength',
					label: 'Skirt Length',
					unit: 'inches',
					description: 'From waist to desired skirt hem.',
				},
			],
		},
	},
}
