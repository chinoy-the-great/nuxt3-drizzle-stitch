import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
	theme: {
		extend: {
			colors: {
				nude: {
					50: '#faf3ec', // Very light nude
					100: '#f4e6d0', // Lighter nude
					300: '#e0b7a3', // Soft nude border
					500: '#d5b5a0', // Medium nude
					600: '#c49b8a', // Darker medium nude
					700: '#7c4a3a', // Darker nude
					800: '#6c3b30', // Dark nude
					900: '#9c7560', // Additional nude text color
				},
			},
			fontSize: {
				xxs: '0.500rem', // Custom smaller font size (10px)
			},
		},
	},
}
