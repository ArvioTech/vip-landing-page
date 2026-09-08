<!-- Registration card: framed. Holds the heading and the lead form. -->
<script setup lang="ts">
	/** After a successful submit the form shows its own thank-you heading, so the card drops this one */
	const done = ref(false);
</script>

<template>
	<aside
		class="border border-line bg-surface-card px-5.5 pt-6.5 pb-6 shadow-card tablet:px-8.5 tablet:pt-8.5 tablet:pb-7.5"
		aria-live="polite"
	>
		<h2 v-if="!done" class="mb-1.5 font-display text-card-title font-normal tracking-display">
			Mám zájem o členství
		</h2>
		<p v-if="!done" class="mt-1 mb-6 text-meta text-muted">
			Zabere to půl minuty. Nic neplatíte, k ničemu se nezavazujete.
		</p>

		<LeadForm @done="done = true" />
	</aside>
</template>
