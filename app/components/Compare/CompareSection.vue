<!-- „Porovnání výhod": both tiles side by side in the choice variant; a single, narrower tile in the sleva / cashback variants -->
<script setup lang="ts">
	const variant = useVariant();

	const head = computed(() => {
		switch (variant.value) {
			case 'sleva':
				return {
					eyebrow: 'Členská výhoda',
					title: 'Nižší cena na každé rezervaci',
					intro: 'Sleva platí po celou dobu trvání klubu a na všechny rezervace. Odečte se rovnou v ceně, nic neuplatňujete a na nic nečekáte.',
				};
			case 'cashback':
				return {
					eyebrow: 'Členská výhoda',
					title: 'Voucher po každém pobytu',
					intro: 'Cashback platí po celou dobu trvání klubu a na všechny rezervace. Po každém dokončeném pobytu dostanete jednorázový voucher na další rezervaci.',
				};
			default:
				return {
					eyebrow: 'Dvě výhody, jedna volba',
					title: 'Sleva hned, nebo voucher po pobytu',
					intro: 'Obě výhody platí po celou dobu trvání klubu a na všechny rezervace. Liší se jen v tom, kdy a jak je dostanete. Vaše volba nám pomůže nastavit klub tak, jak ho členové skutečně chtějí.',
				};
		}
	});

	const showDiscount = computed(() => variant.value !== 'cashback');
	const showCashback = computed(() => variant.value !== 'sleva');
</script>

<template>
	<section id="vyhody" class="border-t border-line py-16">
		<SectionHead :eyebrow="head.eyebrow" :title="head.title">{{ head.intro }}</SectionHead>

		<div :class="variant === 'both' ? 'grid gap-6 desktop:grid-cols-2' : 'max-w-plan'">
			<ComparePlan
				v-if="showDiscount"
				figure="3"
				title="Sleva na všechny objednávky"
				text="Členská cena se odečte přímo při rezervaci. Nic neschraňujete, nic neuplatňujete."
				:points="[
					'Platí na každou rezervaci po dobu členství',
					'Vidíte ji rovnou v ceně pokoje',
					'Nejjednodušší varianta pro časté cesty',
				]"
			>
				<template #example>
					Příklad: pobyt za <b class="font-semibold text-primary tabular-nums">12 000 Kč</b> zaplatíte
					<b class="font-semibold text-primary tabular-nums">11 640 Kč</b>.
				</template>
			</ComparePlan>
			<ComparePlan
				v-if="showCashback"
				figure="5"
				title="Cashback formou voucheru"
				text="Po každé dokončené rezervaci vám vystavíme jednorázový voucher v hodnotě 5 % z ceny objednávky."
				:points="[
					'Vyšší celková výhoda',
					'Voucher uplatníte na další rezervaci',
					'Vhodné, když plánujete více pobytů',
				]"
			>
				<template #example>
					Příklad: po pobytu za <b class="font-semibold text-primary tabular-nums">12 000 Kč</b> získáte
					voucher na <b class="font-semibold text-primary tabular-nums">600 Kč</b>.
				</template>
			</ComparePlan>
		</div>
	</section>
</template>
