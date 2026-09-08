import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/eslint', '@nuxt/fonts', '@vueuse/nuxt'],
	devtools: { enabled: true },
	app: {
		head: {
			htmlAttrs: { lang: 'cs' },
			title: 'V.I.P. Hotel Klub',
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
		families: [
			{
				// display face — headings, big numerals, brand; italic carries the brass emphasis
				name: 'Fraunces',
				provider: 'google',
				weights: ['400 500'],
				styles: ['normal', 'italic'],
			},
			{
				// text face — body 400, labels/buttons 500–600
				name: 'Karla',
				provider: 'google',
				weights: ['400 600'],
				styles: ['normal'],
			},
		],
	},
});
