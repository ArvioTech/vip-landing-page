<!-- Bottom call to action: full-bleed inverse band (dark in light mode, light in dark mode).
     Centered: eyebrow · heading · one-line lead, the form (e-mail + button in one row), then three assurances under a rule. -->
<script setup lang="ts">
	const variant = useVariant();

	const lead = computed(() => {
		switch (variant.value) {
			case 'sleva':
				return 'Nic neplatíte, k ničemu se nezavazujete. Sleva 3 % platí na každou rezervaci po celou dobu klubu.';
			case 'voucher':
				return 'Nic neplatíte, k ničemu se nezavazujete. Voucher 3,5 % dostanete po každém pobytu po celou dobu klubu.';
			default:
				return 'Nic neplatíte, k ničemu se nezavazujete. Vybraná výhoda platí na každou rezervaci po celou dobu klubu.';
		}
	});

	const assurances = ['Vstup pouze na pozvání', 'Přístup ověřujeme ručně', 'Žádný newsletter'];
</script>

<template>
	<section
		id="zajem"
		class="theme-inverse mx-[calc(50%-50vw)] bg-surface-band px-[calc(50vw-50%)] pt-16 pb-18 text-center text-primary desktop:pt-20 desktop:pb-22"
	>
		<div class="mx-auto flex max-w-copy flex-col items-center gap-3.5 desktop:max-w-[760px]">
			<CommonEyebrow>Zájem o členství</CommonEyebrow>
			<h2 class="font-display text-cta font-normal tracking-display text-balance">
				Stačí e‑mail. <em class="text-brass">Ověření a přístup</em> už vyřídíme my.
			</h2>
			<p class="mt-1.5 max-w-lead text-base text-secondary">{{ lead }}</p>
		</div>

		<div class="mt-9">
			<LeadForm band />
		</div>

		<ul
			class="mx-auto mt-9 flex max-w-form flex-wrap justify-center gap-x-7 gap-y-2.5 border-t border-line pt-7 text-label text-muted"
		>
			<li v-for="item in assurances" :key="item" class="flex items-center gap-2">
				<IconCheck class="size-3.5 text-brass" />
				{{ item }}
			</li>
		</ul>
	</section>
</template>
