<!-- Lead form: e-mail · benefit choice (one or two options by variant) · consent · submit. Presentational for now — no submission yet.
     Two layouts: stacked inside the registration card (default), or `band` — frameless, two columns on desktop, brass button. -->
<script setup lang="ts">
	const props = defineProps<{
		/** Frameless two-column layout for the inverse CTA band */
		band?: boolean;
	}>();

	const variant = useVariant();
	const emailId = useId();
	const benefitName = useId();

	const showDiscount = computed(() => variant.value !== 'cashback');
	const showCashback = computed(() => variant.value !== 'sleva');
	const single = computed(() => variant.value !== 'both');

	// Uppercase field label / legend — a touch quieter in the band
	const labelClass = computed(() => [
		'block text-label font-semibold tracking-label uppercase',
		props.band ? 'text-muted' : 'text-secondary',
	]);
</script>

<template>
	<form
		novalidate
		:class="
			band &&
			`border-t border-line-strong pt-8 desktop:grid desktop:grid-cols-2 desktop:grid-rows-[auto_1fr_auto_auto_auto] desktop:items-start desktop:gap-x-10 desktop:[grid-template-areas:'label_opts'_'email_opts'_'consent_submit'_'error_error'_'fine_fine']`
		"
		@submit.prevent
	>
		<label :for="emailId" :class="[labelClass, 'mb-2', band && 'desktop:[grid-area:label]']">Váš e‑mail</label>
		<input
			:id="emailId"
			name="email"
			type="email"
			inputmode="email"
			autocomplete="email"
			placeholder="jmeno@firma.cz"
			required
			class="w-full rounded-field border border-line-strong bg-surface-app p-4.5 text-lead text-primary placeholder:text-muted focus:border-brass focus:ring-4 focus:ring-brass-soft focus:outline-none aria-invalid:border-danger tablet:text-input"
			:class="band && 'desktop:[grid-area:email]'"
		/>

		<fieldset class="mt-6.5" :class="band && 'desktop:mt-0 desktop:[grid-area:opts]'">
			<legend :class="[labelClass, 'mb-2.5']">
				{{ single ? 'Vaše členská výhoda' : 'Která výhoda vás zajímá?' }}
			</legend>
			<div class="grid gap-2.5" :class="band && 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'">
				<LeadBenefitOption
					v-if="showDiscount"
					:name="benefitName"
					value="discount_3"
					:checked="single"
					:plain="band"
					title="Sleva 3 % na všechny objednávky"
					hint="Nižší cena rovnou při rezervaci, po celou dobu trvání klubu."
					figure="3 %"
				/>
				<LeadBenefitOption
					v-if="showCashback"
					:name="benefitName"
					value="cashback_5"
					:checked="single"
					:plain="band"
					title="Cashback 5 % z každé objednávky"
					hint="Po každém pobytu dostanete jednorázový voucher na další rezervaci."
					figure="5 %"
				/>
			</div>
		</fieldset>

		<label
			class="mt-5.5 grid grid-cols-[18px_1fr] gap-3 text-caption text-secondary"
			:class="band && 'desktop:mt-7 desktop:self-center desktop:[grid-area:consent]'"
		>
			<input type="checkbox" name="consent" required class="mt-0.5 size-4.5 accent-brass" />
			<span>
				Souhlasím, abyste mě ohledně členství v klubu kontaktovali e‑mailem nebo telefonicky. Údaje použijete
				jen k ověření zájmu a přístupu.
			</span>
		</label>

		<button
			type="submit"
			class="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-field border px-5 py-4.5 text-base font-semibold tracking-button transition duration-100 hover:border-brass-strong hover:bg-brass-strong active:translate-y-px disabled:cursor-progress disabled:opacity-60"
			:class="
				band
					? 'mt-4.5 border-brass bg-brass text-on-brass desktop:mt-7 desktop:[grid-area:submit]'
					: 'mt-5.5 border-primary bg-primary text-surface-app'
			"
		>
			<span>Mám zájem</span>
			<IconArrowRight class="size-4.5" />
		</button>
		<p
			class="mt-3 text-caption text-danger empty:hidden"
			:class="band && 'desktop:[grid-area:error]'"
			role="alert"
		></p>
		<p class="mt-3.5 text-label text-muted" :class="band ? 'text-left desktop:[grid-area:fine]' : 'text-center'">
			Ozveme se, jakmile váš účet ověříme. Žádný newsletter.
		</p>
	</form>
</template>
