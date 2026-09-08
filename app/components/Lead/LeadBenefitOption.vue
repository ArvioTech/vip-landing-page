<!-- Benefit radio tile: big brass figure on the left, title + hint on the right; brass frame and soft fill when selected -->
<script setup lang="ts">
	defineProps<{
		name: string;
		value: string;
		title: string;
		hint: string;
		figure: string;
		/** Transparent tile (inside the CTA band the field colour would fight the band) */
		plain?: boolean;
	}>();

	/** Selected value of the radio group this tile belongs to */
	const model = defineModel<string>();
</script>

<template>
	<label class="group relative block h-full cursor-pointer">
		<input v-model="model" type="radio" :name="name" :value="value" class="peer sr-only" />
		<span
			class="grid h-full grid-cols-[auto_1fr] content-start items-start gap-x-3.5 gap-y-1 rounded-field border border-line-strong px-4.5 py-4 group-hover:border-brass peer-checked:border-brass peer-checked:bg-brass-soft peer-checked:ring-1 peer-checked:ring-brass peer-checked:ring-inset peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass"
			:class="plain ? 'bg-transparent' : 'bg-surface-app'"
		>
			<span class="row-span-2 font-display text-display-sm leading-none text-brass tabular-nums">{{
				figure
			}}</span>
			<strong class="text-body font-semibold">{{ title }}</strong>
			<small class="text-caption text-muted">{{ hint }}</small>
		</span>
	</label>
</template>
