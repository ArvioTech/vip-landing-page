<!-- Benefit tile: 72px brass figure · display title · copy · bullet points · dashed-rule example -->
<script setup lang="ts">
	defineProps<{
		figure: string;
		title: string;
		text: string;
		points: string[];
	}>();
</script>

<template>
	<article class="border border-line bg-surface-nested p-7.5">
		<div class="font-display text-display-lg text-brass tabular-nums">
			{{ figure }}<small class="text-card-title"> %</small>
		</div>
		<h3 class="mt-3 mb-2 font-display text-plan-title font-normal tracking-display">{{ title }}</h3>
		<p class="mb-4 text-meta text-secondary">{{ text }}</p>
		<ul class="grid gap-2 text-meta">
			<li
				v-for="point in points"
				:key="point"
				class="grid grid-cols-[16px_1fr] gap-2.5 before:mt-2 before:size-1.5 before:justify-self-center before:rounded-full before:bg-brass before:content-['']"
			>
				{{ point }}
			</li>
		</ul>
		<p class="mt-4.5 border-t border-dashed border-line-strong pt-3.5 text-caption text-muted">
			<slot name="example" />
		</p>
	</article>
</template>
