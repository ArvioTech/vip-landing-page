// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default withNuxt(eslintPluginPrettierRecommended, {
	files: ['**/*.vue'],
	rules: {
		// SFC block order: script setup first, then template, then style (client convention)
		'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
	},
});
