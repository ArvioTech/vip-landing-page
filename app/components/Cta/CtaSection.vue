<!-- Bottom call to action: full-bleed inverse band (dark in light mode, light in dark mode) with the lead form laid out in two columns -->
<script setup lang="ts"></script>

<template>
	<section
		id="zajem"
		class="theme-inverse mx-[calc(50%-50vw)] bg-surface-band px-[calc(50vw-50%)] pt-14 pb-16 text-primary desktop:pt-18 desktop:pb-20"
	>
		<div
			class="mb-8 grid gap-5 desktop:mb-10 desktop:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] desktop:items-end desktop:gap-x-14 desktop:gap-y-8"
		>
			<div>
				<CommonEyebrow>Zájem o členství</CommonEyebrow>
				<h2 class="mt-2.5 font-display text-cta font-normal tracking-display text-balance">
					Stačí e‑mail. <em class="text-brass">Ověření a přístup</em> už vyřídíme my.
				</h2>
			</div>
			<ul class="mb-1.5 grid gap-2.5 text-meta text-secondary">
				<li
					v-for="point in [
						'Nic neplatíte, k ničemu se nezavazujete',
						'Výhoda platí na každou rezervaci po celou dobu klubu',
						'Žádný newsletter, jen jeden e‑mail s přístupem',
					]"
					:key="point"
					class="grid grid-cols-[14px_1fr] items-start gap-3 before:mt-2 before:size-2 before:rounded-full before:bg-brass before:content-['']"
				>
					{{ point }}
				</li>
			</ul>
		</div>

		<LeadForm band />
	</section>
</template>
