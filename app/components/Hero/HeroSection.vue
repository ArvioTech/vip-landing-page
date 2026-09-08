<!-- Hero: eyebrow · headline · lead · perks on the left, the registration card on the right (stacked below on tablet) -->
<script setup lang="ts">
	const variant = useVariant();

	const benefitPerk = computed(() => {
		switch (variant.value) {
			case 'sleva':
				return 'Sleva 3 % na všechny objednávky po celou dobu trvání klubu, nejen na první.';
			case 'cashback':
				return 'Cashback 5 % z každé objednávky formou voucheru, po celou dobu trvání klubu.';
			default:
				return 'Sleva 3 % nebo cashback 5 % – platí na všechny objednávky po celou dobu trvání klubu, nejen na první.';
		}
	});
</script>

<template>
	<section
		class="grid items-start gap-10 pt-11 pb-14 desktop:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] desktop:gap-14 desktop:pt-16 desktop:pb-18"
	>
		<div>
			<CommonEyebrow>Uzavřený klub pro rezervace hotelů</CommonEyebrow>
			<h1 class="mt-3.5 mb-5.5 font-display text-hero font-normal tracking-display text-balance">
				Hotely za členské ceny. <em class="text-brass">Bez hledání slev,</em> po celou dobu členství.
			</h1>
			<p class="mb-8.5 max-w-lead text-lead text-secondary">
				Připravujeme klub, kde členové rezervují hotely s trvalou výhodou na každé objednávce. Zatím zjišťujeme
				zájem: zanechte e‑mail, vyberte výhodu, která vám dává větší smysl, a my ověříme váš přístup.
			</p>

			<ul class="border-t border-line">
				<li class="grid grid-cols-[26px_1fr] gap-4 border-b border-line py-4.5">
					<IconCheck class="mt-[3px] size-5.5 text-brass" />
					<div>
						<strong class="mb-0.5 block font-semibold">Výhoda na každou rezervaci</strong>
						<p class="text-meta text-secondary">{{ benefitPerk }}</p>
					</div>
				</li>
				<li class="grid grid-cols-[26px_1fr] gap-4 border-b border-line py-4.5">
					<IconShield class="mt-[3px] size-5.5 text-brass" />
					<div>
						<strong class="mb-0.5 block font-semibold">Ověření členové, žádná veřejná registrace</strong>
						<p class="text-meta text-secondary">
							Do klubu zveme osobně. Každý účet před aktivací ověříme, takže portál zůstane přehledný a
							ceny členské.
						</p>
					</div>
				</li>
				<li class="grid grid-cols-[26px_1fr] gap-4 border-b border-line py-4.5">
					<IconHotel class="mt-[3px] size-5.5 text-brass" />
					<div>
						<strong class="mb-0.5 block font-semibold">Jeden portál, přihlášení, rezervace</strong>
						<p class="text-meta text-secondary">
							Po ověření dostanete přístup do rezervačního portálu. Výhoda se uplatní automaticky, bez
							kódů a bez papírování.
						</p>
					</div>
				</li>
			</ul>
		</div>

		<LeadCard />
	</section>
</template>
