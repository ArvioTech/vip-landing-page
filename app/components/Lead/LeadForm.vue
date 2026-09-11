<!-- Lead form: e-mail (pre-filled from ?e= when the invitation link carries it) · benefit (two radio tiles in the choice variant, one static tile in sleva / voucher) · consent · submit → POST /api/leads.
     After a successful submit the form is replaced by a thank-you block: brass seal, what was sent, what happens next,
     and a way back in case of a typo in the e-mail. Emits `done` so the card can drop its own heading.
     Two layouts: stacked inside the registration card (default), or `band` — centered 720px column in the CTA band:
     benefit tiles (choice variant only), e-mail + brass button in one row, consent underneath; no fine print (the band has its own). -->
<script setup lang="ts">
	import type { LeadPayload } from '~~/server/api/leads.post';

	const props = defineProps<{
		/** Frameless two-column layout for the inverse CTA band */
		band?: boolean;
	}>();

	const emit = defineEmits<{ done: [] }>();

	const variant = useVariant();
	const emailId = useId();
	const benefitName = useId();

	const single = computed(() => variant.value !== 'both');

	// Uppercase field label / legend — a touch quieter in the band
	const labelClass = computed(() => [
		'block text-label font-semibold tracking-label uppercase',
		props.band ? 'text-muted' : 'text-secondary',
	]);

	// Pre-filled from the invitation link (?e=) or the tab's sessionStorage, otherwise empty
	const emailParam = useEmailParam();
	const email = ref(emailParam.value);
	watch(emailParam, (value) => {
		if (!email.value) email.value = value;
	});
	// Single-benefit variants come pre-selected; with both on offer the visitor has to pick
	const benefit = ref<LeadPayload['benefit'] | undefined>(
		variant.value === 'sleva' ? 'discount_3' : variant.value === 'voucher' ? 'voucher_35' : undefined
	);
	const consent = ref(false);

	const benefits: Record<NonNullable<LeadPayload['benefit']>, { title: string; hint: string; figure: string }> = {
		discount_3: {
			title: 'Sleva 3 % na všechny objednávky',
			hint: 'Nižší cena rovnou při rezervaci, po celou dobu trvání klubu.',
			figure: '3 %',
		},
		voucher_35: {
			title: '3,5 % z každé objednávky zpět',
			hint: 'Po každém pobytu dostanete jednorázový voucher na další rezervaci.',
			figure: '3,5 %',
		},
	};

	/** What happens after the submit — steps 3 and 4 of „Jak to probíhá" */
	const next = [
		{ title: 'Ověření', text: 'Váš účet ověříme a připravíme. Ozveme se e‑mailem nebo telefonem.' },
		{ title: 'Přístup', text: 'Přihlásíte se do portálu a rezervujete s členskou výhodou na každé objednávce.' },
	];

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
			emit('done');
		} catch (e) {
			const data = (e as { data?: { message?: string } }).data;
			error.value = data?.message || 'Odeslání se nepovedlo. Zkuste to prosím za chvíli znovu.';
			status.value = 'idle';
		}
	}
</script>

<template>
	<div
		v-if="status === 'done'"
		role="status"
		class="motion-safe:animate-rise"
		:class="band && 'mx-auto w-full max-w-form border-t border-line-strong pt-8 text-left'"
	>
		<div>
			<div class="flex items-center gap-3.5">
				<span
					class="grid size-11 shrink-0 place-items-center rounded-full border border-brass bg-brass-soft text-brass motion-safe:animate-seal"
				>
					<IconCheck class="size-5.5" />
				</span>
				<p class="text-micro font-semibold tracking-badge text-brass uppercase">
					Pozvání přijato · krok 2 ze 4
				</p>
			</div>
			<h3 class="mt-5 font-display text-display-sm font-normal tracking-display text-balance">
				Děkujeme, <em class="text-brass">máme to.</em>
			</h3>
			<p class="mt-3 max-w-note text-meta text-secondary">
				Jakmile váš účet ověříme, ozveme se na <b class="font-semibold text-primary">{{ email.trim() }}</b
				>. Žádný newsletter, jen jeden e‑mail s přístupem.
			</p>
		</div>

		<div class="mt-7">
			<dl
				class="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 border-line py-4 text-caption"
				:class="band ? 'border-y' : 'rounded-field border bg-surface-app px-4.5'"
			>
				<dt class="text-label font-semibold tracking-label text-muted uppercase">E‑mail</dt>
				<dd class="min-w-0 truncate font-semibold text-primary">{{ email.trim() }}</dd>
				<dt class="text-label font-semibold tracking-label text-muted uppercase">Výhoda</dt>
				<dd class="font-semibold text-primary">{{ benefit ? benefits[benefit].title : '—' }}</dd>
			</dl>

			<p :class="[labelClass, 'mt-6 mb-3']">Co bude dál</p>
			<ol class="grid gap-3.5">
				<li
					v-for="(step, i) in next"
					:key="step.title"
					class="grid grid-cols-[28px_1fr] items-baseline gap-x-3"
				>
					<span class="font-display text-plan-title leading-none text-brass tabular-nums">{{ i + 3 }}</span>
					<span class="text-meta text-secondary">
						<b class="font-semibold text-primary">{{ step.title }}.</b> {{ step.text }}
					</span>
				</li>
			</ol>

			<p class="mt-6 text-caption text-muted">
				Překlep v e‑mailu?
				<button
					type="button"
					class="cursor-pointer font-semibold text-brass underline decoration-brass/40 underline-offset-3 hover:decoration-brass"
					@click="status = 'idle'"
				>
					Opravit a odeslat znovu
				</button>
			</p>
		</div>
	</div>

	<form
		v-else
		novalidate
		class="flex flex-col"
		:class="band && 'mx-auto w-full max-w-form text-left'"
		@submit.prevent="submit"
	>
		<label :for="emailId" :class="[labelClass, 'mb-2', band ? 'sr-only' : 'order-1']">Váš e‑mail</label>

		<!-- Card: the wrapper dissolves (`contents`) so input and button take their own places in the column.
		     Band: it is the one-row group — input grows, brass button attached (stacked under the input on phones). -->
		<div
			:class="
				band
					? 'order-2 flex flex-col overflow-hidden rounded-field border border-line-strong bg-surface-app focus-within:border-brass tablet:flex-row'
					: 'contents'
			"
		>
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
				class="text-lead text-primary placeholder:text-muted focus:outline-none aria-invalid:border-danger tablet:text-input"
				:class="
					band
						? 'min-w-0 flex-1 bg-transparent px-5.5 py-4.5'
						: 'order-2 w-full rounded-field border border-line-strong bg-surface-app p-4.5 focus:border-brass'
				"
			/>
			<button
				type="submit"
				:disabled="status === 'sending'"
				class="flex cursor-pointer items-center justify-center gap-2.5 text-base font-semibold tracking-button transition duration-100 hover:border-brass-strong hover:bg-brass-strong active:translate-y-px disabled:cursor-progress disabled:opacity-60"
				:class="
					band
						? 'shrink-0 bg-brass px-6.5 py-4.5 text-on-brass tablet:py-0'
						: 'order-5 mt-5.5 w-full rounded-field border border-primary bg-primary px-5 py-4.5 text-surface-app'
				"
			>
				<span>{{ status === 'sending' ? 'Odesílám…' : 'Přijmout pozvání' }}</span>
				<IconArrowRight class="size-4.5" />
			</button>
		</div>

		<!-- Single-benefit variants: the benefit is given, so the card shows it as a static tile (the band says it in its lead) -->
		<div v-if="single && benefit && !band" class="order-3 mt-6.5">
			<p :class="[labelClass, 'mb-2.5']">Vaše členská výhoda</p>
			<div
				class="grid grid-cols-[auto_1fr] items-start gap-x-3.5 gap-y-1 rounded-field border border-brass bg-brass-soft px-4.5 py-4"
			>
				<span class="row-span-2 font-display text-display-sm leading-none text-brass tabular-nums">{{
					benefits[benefit].figure
				}}</span>
				<strong class="text-body font-semibold">{{ benefits[benefit].title }}</strong>
				<small class="text-caption text-muted">{{ benefits[benefit].hint }}</small>
			</div>
		</div>

		<fieldset v-else-if="!single" :class="band ? 'order-1 mb-5' : 'order-3 mt-6.5'">
			<legend :class="[labelClass, 'mb-2.5']">Která výhoda vás zajímá?</legend>
			<div class="grid gap-2.5" :class="band && 'tablet:grid-cols-2'">
				<LeadBenefitOption
					v-for="(item, key) in benefits"
					:key="key"
					v-model="benefit"
					:name="benefitName"
					:value="key"
					:plain="band"
					:title="item.title"
					:hint="item.hint"
					:figure="item.figure"
				/>
			</div>
		</fieldset>

		<label
			class="grid cursor-pointer grid-cols-[18px_1fr] gap-3 text-caption text-secondary"
			:class="band ? 'order-3 mx-auto mt-5 max-w-[560px]' : 'order-4 mt-5.5'"
		>
			<!-- Custom box, not the native control: native checkboxes follow the element's color-scheme,
			     so inside the inverse band an unchecked one renders as a dark grey square. -->
			<span class="relative mt-0.5 size-4.5">
				<input
					v-model="consent"
					type="checkbox"
					name="consent"
					required
					class="peer size-full cursor-pointer appearance-none rounded-field border border-line-strong bg-surface-app transition-colors checked:border-brass checked:bg-brass hover:border-brass"
				/>
				<IconCheck
					class="pointer-events-none absolute inset-0 m-auto size-3.5 text-on-brass opacity-0 transition-opacity peer-checked:opacity-100"
				/>
			</span>
			<span>
				Souhlasím, abyste mě ohledně členství v klubu kontaktovali e‑mailem nebo telefonicky. Údaje použijeme
				jen k ověření zájmu a přístupu, více v
				<a
					href="/documents/zasady-ochrany-osobnich-udaju.pdf"
					target="_blank"
					rel="noopener"
					class="font-semibold text-brass underline decoration-brass/40 underline-offset-3 hover:decoration-brass"
				>zásadách ochrany osobních údajů</a>.
			</span>
		</label>

		<!-- Error box: filled and framed in danger so it reads at a glance, not just a red line of small text -->
		<p
			v-if="error"
			class="mt-4 flex items-start gap-2.5 rounded-field border border-danger bg-danger-soft px-4 py-3 text-meta font-medium text-danger"
			:class="band ? 'order-4 text-left' : 'order-6'"
			role="alert"
		>
			<IconAlert class="mt-0.5 size-5 shrink-0" />
			<span>{{ error }}</span>
		</p>
		<p v-if="!band" class="order-7 mt-3.5 text-center text-label text-muted">
			Ozveme se, jakmile váš účet ověříme. Žádný newsletter.
		</p>
	</form>
</template>
