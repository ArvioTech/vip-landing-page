<!-- Section head: eyebrow + display heading on the left, optional intro paragraph on the right (stacked on tablet) -->
<script setup lang="ts">
	defineProps<{
		eyebrow: string;
		title: string;
	}>();
</script>

<template>
	<div class="mb-10 grid gap-4 desktop:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] desktop:gap-10">
		<div>
			<CommonEyebrow>{{ eyebrow }}</CommonEyebrow>
			<h2 class="mt-2.5 font-display text-section font-normal tracking-display text-balance">{{ title }}</h2>
		</div>
		<p v-if="$slots.default" class="max-w-copy self-end text-secondary">
			<slot />
		</p>
	</div>
</template>
