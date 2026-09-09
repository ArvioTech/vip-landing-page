import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/eslint', '@nuxt/fonts', '@vueuse/nuxt'],
	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: { lang: 'cs' },
			title: 'Premium Dovolená za benefity',
			link: [
				// brass „P" seal — SVG for modern browsers, ICO fallback, PNG for iOS home screen
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
			],
		},
	},
	css: ['~/assets/css/main.css'],
	compatibilityDate: '2025-07-15',
	vite: {
		plugins: [tailwindcss()],
	},
	eslint: {
		config: {
			stylistic: {
				indent: 4,
				semi: true,
				quotes: 'single',
			},
		},
	},
	fonts: {
		defaults: {
			// Metric-matched fallbacks (size-adjust from Arial / Georgia width metrics) so text wraps
			// the same before and after the web font arrives — otherwise the card grew ~20px on load.
			fallbacks: { 'sans-serif': ['Arial'], serif: ['Georgia'] },
		},
		families: [
			{
				// display face — headings, big numerals, brand; italic carries the brass emphasis
				name: 'Fraunces',
				provider: 'google',
				preload: true,
				weights: ['400 500'],
				styles: ['normal', 'italic'],
			},
			{
				// text face — body 400, labels/buttons 500–600
				name: 'Karla',
				provider: 'google',
				preload: true,
				weights: ['400 600'],
				styles: ['normal'],
			},
		],
	},
});
