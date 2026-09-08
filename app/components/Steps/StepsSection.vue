<!-- „Jak to probíhá": four numbered steps (step 2 mentions the benefit choice only in the choice variant) — 4 columns on desktop, 2×2 on tablet, stacked on phones.
     The 1px dividers are the grid gap showing the line-coloured background, so they follow every layout automatically. -->
<script setup lang="ts">
	const variant = useVariant();

	const steps = computed(() => [
		{
			title: 'Pozvání',
			text: 'Zavolali jsme vám a poslali odkaz na tuto stránku. Vstup do klubu je pouze na pozvání.',
		},
		{
			title: 'Zájem',
			text:
				variant.value === 'both'
					? 'Zanecháte e‑mail a vyberete výhodu, která vám sedí víc. Zabere to půl minuty.'
					: 'Zanecháte e‑mail a potvrdíte zájem. Zabere to půl minuty.',
			now: true,
		},
		{
			title: 'Ověření',
			text: 'Váš účet ověříme a připravíme. Ozveme se vám e‑mailem nebo telefonem.',
		},
		{
			title: 'Přístup',
			text: 'Přihlásíte se do portálu a rezervujete hotely s členskou výhodou na každé objednávce.',
		},
	]);
</script>

<template>
	<section id="jak" class="border-t border-line py-16">
		<SectionHead eyebrow="Jak to probíhá" title="Čtyři kroky od telefonátu k první rezervaci">
			Nechceme otevřený web, kde se zaregistruje kdokoli. Klub stavíme kolem lidí, které známe, proto vede cesta
			přes osobní pozvání a ruční ověření.
		</SectionHead>

		<ol class="grid gap-px border-t border-line-strong bg-line tablet:grid-cols-2 desktop:grid-cols-4">
			<li
				v-for="(step, i) in steps"
				:key="step.title"
				class="bg-surface-app py-5 tablet:py-5.5 tablet:pr-4 tablet:even:pl-4 desktop:py-6 desktop:pr-6 desktop:nth-[n+2]:pl-6"
			>
				<div class="font-display text-display-md text-brass tabular-nums">{{ i + 1 }}</div>
				<h3 class="mt-3.5 mb-1.5 text-base font-semibold">{{ step.title }}</h3>
				<p class="text-meta text-secondary">{{ step.text }}</p>
				<span
					v-if="step.now"
					class="mt-3 inline-block rounded-pill border border-brass px-2 py-0.75 text-micro font-semibold tracking-badge text-brass uppercase"
				>
					Právě teď
				</span>
			</li>
		</ol>
	</section>
</template>
