<!-- Page header: brand (brass seal + „Premium Dovolená za benefity" wordmark) · invite-only note (hidden on phones) -->
<script setup lang="ts"></script>

<template>
	<header class="flex items-center justify-between gap-6 border-b border-line pt-6.5 pb-5.5">
		<NuxtLink to="/" class="flex items-center gap-3 no-underline">
			<span
				class="grid size-8.5 place-items-center rounded-full border border-brass font-display text-meta text-brass"
				aria-hidden="true"
			>
				P
			</span>
			<span class="flex flex-col">
				<span class="font-display text-brand font-normal italic leading-none tracking-brand text-brass"
					>Premium</span
				>
				<span class="mt-1 text-micro font-semibold uppercase tracking-[0.08em] text-muted"
					>Dovolená za benefity</span
				>
			</span>
		</NuxtLink>

		<p class="hidden text-caption text-muted tablet:block">
			Vstup pouze na pozvání · <b class="font-semibold text-primary">Přístup ověřujeme ručně</b>
		</p>
	</header>
</template>
