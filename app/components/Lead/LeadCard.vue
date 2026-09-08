<!-- Registration card: framed, sticky on desktop, rises in on load. Holds the heading, member-no note and the lead form. -->
<script setup lang="ts"></script>

<template>
	<aside
		class="border border-line bg-surface-card px-5.5 pt-6.5 pb-6 shadow-card motion-safe:animate-rise tablet:px-8.5 tablet:pt-8.5 tablet:pb-7.5 desktop:sticky desktop:top-6"
		aria-live="polite"
	>
		<div class="mb-1.5 flex items-baseline justify-between gap-3">
			<h2 class="font-display text-card-title font-normal tracking-display">Mám zájem o členství</h2>
			<p class="text-micro tracking-micro whitespace-nowrap text-muted uppercase">
				Č. člena <b class="font-semibold text-brass">přidělíme po ověření</b>
			</p>
		</div>
		<p class="mt-1 mb-6 text-meta text-muted">Zabere to půl minuty. Nic neplatíte, k ničemu se nezavazujete.</p>

		<LeadForm />
	</aside>
</template>
