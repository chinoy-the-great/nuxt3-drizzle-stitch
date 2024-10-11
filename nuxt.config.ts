// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	buildModules: ['@nuxtjs/pwa'],
	pwa: {
		manifest: {
			name: 'Stitch In Time',
			short_name: 'S.I.T.',
			description: 'Stitch In Time is a revolutionary app about fashion.',
		},
		workbox: {
			// Customize the caching strategy
			offline: true,
			offlineStrategy: 'CacheFirst',
		},
	},
})
