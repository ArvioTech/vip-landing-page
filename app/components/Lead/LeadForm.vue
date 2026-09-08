<!-- Lead form: e-mail · benefit choice (one or two options by variant) · consent · submit → POST /api/leads.
     After a successful submit the form is replaced by a short thank-you note.
     Two layouts: stacked inside the registration card (default), or `band` — frameless, two columns on desktop, brass button. -->
<script setup lang="ts">
	import type { LeadPayload } from '~~/server/api/leads.post';

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

	const email = ref('');
	// Single-benefit variants come pre-selected; with both on offer the visitor has to pick
	const benefit = ref<LeadPayload['benefit'] | undefined>(
		single.value ? (showDiscount.value ? 'discount_3' : 'cashback_5') : undefined
	);
	const consent = ref(false);

	const status = ref<'idle' | 'sending' | 'done'>('idle');
	const error = ref('');
	const emailInvalid = computed(() => Boolean(error.value) && !/^\S+@\S+\.\S{2,}$/.test(email.value.trim()));

	async function submit() {
		error.value = '';
		if (!/^\S+@\S+\.\S{2,}$/.test(email.value.trim())) {
			error.value = 'Zadejte prosím platný e‑mail.';
			return;
		}
		if (!benefit.value) {
			error.value = 'Vyberte prosím jednu z výhod.';
			return;
		}
		if (!consent.value) {
			error.value = 'Bez souhlasu s kontaktováním vás bohužel nemůžeme zařadit.';
			return;
		}

		status.value = 'sending';
		try {
			await $fetch('/api/leads', {
				method: 'POST',
				body: {
					email: email.value.trim(),
					benefit: benefit.value,
					variant: variant.value,
					placement: props.band ? 'band' : 'card',
					consent: true,
				} satisfies LeadPayload,
			});
			status.value = 'done';
		} catch (e) {
			const data = (e as { data?: { message?: string } }).data;
			error.value = data?.message || 'Odeslání se nepovedlo. Zkuste to prosím za chvíli znovu.';
			status.value = 'idle';
		}
	}
</script>

<template>
	<div v-if="status === 'done'" role="status" :class="band && 'border-t border-line-strong pt-8'">
		<h3 class="font-display text-display-sm font-normal tracking-display text-balance">
			Děkujeme, <em class="text-brass">máme to.</em>
		</h3>
		<p class="mt-3 text-meta text-secondary">
			Jakmile váš účet ověříme, ozveme se na <b class="font-semibold text-primary">{{ email.trim() }}</b
			>. Žádný newsletter, jen jeden e‑mail s přístupem.
		</p>
	</div>

	<form
		v-else
		novalidate
		:class="
			band &&
			`border-t border-line-strong pt-8 desktop:grid desktop:grid-cols-2 desktop:grid-rows-[auto_1fr_auto_auto_auto] desktop:items-start desktop:gap-x-10 desktop:[grid-template-areas:'label_opts'_'email_opts'_'consent_submit'_'error_error'_'fine_fine']`
		"
		@submit.prevent="submit"
	>
		<label :for="emailId" :class="[labelClass, 'mb-2', band && 'desktop:[grid-area:label]']">Váš e‑mail</label>
		<input
			:id="emailId"
			v-model="email"
			name="email"
			type="email"
			inputmode="email"
			autocomplete="email"
			placeholder="jmeno@firma.cz"
			required
			:aria-invalid="emailInvalid || undefined"
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
					v-model="benefit"
					:name="benefitName"
					value="discount_3"
					:plain="band"
					title="Sleva 3 % na všechny objednávky"
					hint="Nižší cena rovnou při rezervaci, po celou dobu trvání klubu."
					figure="3 %"
				/>
				<LeadBenefitOption
					v-if="showCashback"
					v-model="benefit"
					:name="benefitName"
					value="cashback_5"
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
			<input v-model="consent" type="checkbox" name="consent" required class="mt-0.5 size-4.5 accent-brass" />
			<span>
				Souhlasím, abyste mě ohledně členství v klubu kontaktovali e‑mailem nebo telefonicky. Údaje použijete
				jen k ověření zájmu a přístupu.
			</span>
		</label>

		<button
			type="submit"
			:disabled="status === 'sending'"
			class="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-field border px-5 py-4.5 text-base font-semibold tracking-button transition duration-100 hover:border-brass-strong hover:bg-brass-strong active:translate-y-px disabled:cursor-progress disabled:opacity-60"
			:class="
				band
					? 'mt-4.5 border-brass bg-brass text-on-brass desktop:mt-7 desktop:[grid-area:submit]'
					: 'mt-5.5 border-primary bg-primary text-surface-app'
			"
		>
			<span>{{ status === 'sending' ? 'Odesílám…' : 'Mám zájem' }}</span>
			<IconArrowRight class="size-4.5" />
		</button>
		<p class="mt-3 text-caption text-danger empty:hidden" :class="band && 'desktop:[grid-area:error]'" role="alert">
			{{ error }}
		</p>
		<p class="mt-3.5 text-label text-muted" :class="band ? 'text-left desktop:[grid-area:fine]' : 'text-center'">
			Ozveme se, jakmile váš účet ověříme. Žádný newsletter.
		</p>
	</form>
</template>
