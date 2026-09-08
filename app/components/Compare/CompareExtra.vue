<!-- Membership extra: outlined card (lighter than the filled benefit tile) — brass icon + „Navíc pro členy" tag · display title · copy.
     Stretches to fill its grid cell so two of them stack to the height of the benefit tile. -->
<script setup lang="ts">
	defineProps<{
		title: string;
		text: string;
	}>();
</script>

<template>
	<article class="flex flex-col border border-line p-7.5">
		<div class="flex items-center justify-between gap-4">
			<slot name="icon" />
			<span class="text-micro font-semibold tracking-badge text-brass uppercase">Navíc pro členy</span>
		</div>
		<h3 class="mt-5 font-display text-plan-title font-normal tracking-display">{{ title }}</h3>
		<p class="mt-2 text-meta text-secondary">{{ text }}</p>
	</article>
</template>
