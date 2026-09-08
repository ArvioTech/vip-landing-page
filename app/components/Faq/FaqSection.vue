<!-- „Časté otázky": two-column Q&A list; the third question follows the page variant -->
<script setup lang="ts">
	const variant = useVariant();

	const variantQuestion = computed(() => {
		switch (variant.value) {
			case 'sleva':
				return {
					q: 'Platí sleva i na akční ceny hotelů?',
					a: 'Ano. Členská sleva se odečítá z ceny, kterou v portálu vidíte, bez ohledu na to, zda hotel právě nabízí vlastní akci.',
				};
			case 'cashback':
				return {
					q: 'Jak dlouho voucher platí?',
					a: 'Voucher vystavíme po dokončení pobytu a uplatníte ho na kteroukoli další rezervaci v portálu. Přesnou platnost upřesníme před spuštěním.',
				};
			default:
				return {
					q: 'Můžu výhodu později změnit?',
					a: 'Teď nám jen říkáte, co vás láká víc. Před spuštěním portálu si volbu společně potvrdíme.',
				};
		}
	});

	const items = computed(() => [
		{
			q: 'K čemu se zadáním e‑mailu zavazuji?',
			a:
				variant.value === 'both'
					? 'K ničemu. Jen nám říkáte, že vás klub zajímá a kterou výhodu byste si vybrali. Členství můžete kdykoli odmítnout.'
					: 'K ničemu. Jen nám říkáte, že vás klub zajímá. Členství můžete kdykoli odmítnout.',
		},
		{
			q: 'Kdy se mi ozvete?',
			a: 'Účty ověřujeme ručně, obvykle do několika pracovních dnů. Ozveme se e‑mailem nebo na telefon, ze kterého jste s námi mluvili.',
		},
		variantQuestion.value,
		{
			q: 'Jak dlouho klub trvá?',
			a: 'Výhody platí po celou dobu trvání klubu. O jeho podmínkách a délce vás budeme informovat před aktivací účtu.',
		},
	]);
</script>

<template>
	<section id="otazky" class="border-t border-line py-16">
		<SectionHead eyebrow="Časté otázky" title="Co ještě chcete vědět" />

		<dl class="grid gap-7 desktop:grid-cols-2 desktop:gap-x-12">
			<div v-for="item in items" :key="item.q">
				<dt class="mb-1.5 text-base font-semibold">{{ item.q }}</dt>
				<dd class="text-meta text-secondary">{{ item.a }}</dd>
			</div>
		</dl>
	</section>
</template>
