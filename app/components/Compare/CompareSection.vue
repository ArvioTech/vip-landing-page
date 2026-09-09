<!-- „Porovnání výhod": the benefit tile(s) plus two membership extras (price watch, fast booking).
     Choice variant: both tiles side by side, extras in a row below. Sleva / voucher: one tile on the left,
     the two extras stacked on the right so the section does not run half empty. -->
<script setup lang="ts">
	const variant = useVariant();
	const single = computed(() => variant.value !== 'both');

	const head = computed(() => {
		switch (variant.value) {
			case 'sleva':
				return {
					eyebrow: 'Členská výhoda',
					title: 'Nižší cena na každé rezervaci',
					intro: 'Sleva platí po celou dobu trvání klubu a na všechny rezervace. Odečte se rovnou v ceně, nic neuplatňujete a na nic nečekáte.',
				};
			case 'voucher':
				return {
					eyebrow: 'Členská výhoda',
					title: 'Voucher po každém pobytu',
					intro: 'Výhoda platí po celou dobu trvání klubu a na všechny rezervace. Po každém dokončeném pobytu dostanete jednorázový voucher ve výši 3,5 % na další rezervaci.',
				};
			default:
				return {
					eyebrow: 'Dvě výhody, jedna volba',
					title: 'Sleva hned, nebo voucher po pobytu',
					intro: 'Obě výhody platí po celou dobu trvání klubu a na všechny rezervace. Liší se jen v tom, kdy a jak je dostanete. Vyberte si tu, která sedí vašemu způsobu cestování.',
				};
		}
	});

	const showDiscount = computed(() => variant.value !== 'voucher');
	const showVoucher = computed(() => variant.value !== 'sleva');

	/** Bullet points — the comparative wording („nejjednodušší", „vyšší") only makes sense when both tiles are shown */
	const discountPoints = computed(() => [
		'Platí na každou rezervaci po dobu členství',
		'Vidíte ji rovnou v ceně pokoje',
		single.value ? 'Čím častěji cestujete, tím více ušetříte' : 'Nejjednodušší varianta pro časté cesty',
	]);
	const voucherPoints = computed(() =>
		single.value
			? [
					'Voucher dostanete po skončení pobytu',
					'Uplatníte ho na kteroukoli další rezervaci',
				]
			: ['Vyšší celková výhoda', 'Voucher uplatníte na další rezervaci', 'Vhodné, když plánujete více pobytů']
	);
</script>

<template>
	<section id="vyhody" class="border-t border-line py-16">
		<SectionHead :eyebrow="head.eyebrow" :title="head.title">{{ head.intro }}</SectionHead>

		<div
			class="grid gap-6"
			:class="single ? 'desktop:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]' : 'desktop:grid-cols-2'"
		>
			<ComparePlan
				v-if="showDiscount"
				figure="3"
				title="Sleva na všechny objednávky"
				text="Členská cena se odečte přímo při rezervaci. Nic nesbíráte, nic neuplatňujete."
				:points="discountPoints"
			>
				<template #example>
					Příklad: pobyt za <b class="font-semibold text-primary tabular-nums">12 000 Kč</b> zaplatíte
					<b class="font-semibold text-primary tabular-nums">11 640 Kč</b>.
				</template>
			</ComparePlan>
			<ComparePlan
				v-if="showVoucher"
				figure="3,5"
				title="Voucher na další rezervaci"
				text="Po každém dokončeném pobytu vám vystavíme jednorázový voucher v hodnotě 3,5 % z ceny objednávky."
				:points="voucherPoints"
			>
				<template #example>
					Příklad: po pobytu za <b class="font-semibold text-primary tabular-nums">12 000 Kč</b> získáte
					voucher na <b class="font-semibold text-primary tabular-nums">420 Kč</b>.
				</template>
			</ComparePlan>

			<div class="grid gap-6" :class="single ? 'desktop:grid-rows-2' : 'desktop:col-span-2 desktop:grid-cols-2'">
				<CompareExtra
					title="Hlídací pes cen"
					text="Hotely, které vás zajímají, sledujeme za vás. Když cena klesne, dáme vám vědět a vy ušetříte další peníze."
				>
					<template #icon><IconBell class="size-6 text-brass" /></template>
				</CompareExtra>
				<CompareExtra
					title="Rezervace na pár kliknutí"
					text="Vaše údaje máme předvyplněné a rezervační krok zjednodušený. Pobyt rezervujete během chvíle, bez opakovaného vyplňování formulářů."
				>
					<template #icon><IconBolt class="size-6 text-brass" /></template>
				</CompareExtra>
			</div>
		</div>
	</section>
</template>
