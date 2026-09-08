<!-- Page header: brand (brass seal + display wordmark) · invite-only note (hidden on phones) -->
<script setup lang="ts"></script>

<template>
	<header class="flex items-center justify-between gap-6 border-b border-line pt-6.5 pb-5.5">
		<NuxtLink to="/" class="flex items-center gap-3 no-underline">
			<span
				class="grid size-8.5 place-items-center rounded-full border border-brass font-display text-meta text-brass"
				aria-hidden="true"
			>
				V
			</span>
			<span class="font-display text-brand font-normal tracking-brand text-primary">
				Hotelový klub <span class="italic text-brass">V.I.P.</span>
			</span>
		</NuxtLink>

		<p class="hidden text-label text-muted tablet:block">
			Vstup pouze na pozvání · <b class="font-semibold text-primary">Přístup ověřujeme ručně</b>
		</p>
	</header>
</template>
