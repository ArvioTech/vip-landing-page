/**
 * POST /api/leads — stores interest in the club membership.
 * Body: { email, benefit, variant, placement, consent }. Re-submitting the same e-mail updates the chosen benefit.
 */
const BENEFITS = ['discount_3', 'cashback_5'] as const;
const VARIANTS = ['both', 'sleva', 'cashback'] as const;
const PLACEMENTS = ['card', 'band'] as const;

// Deliberately loose — the real check is the e-mail we send after verification
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface LeadPayload {
	email: string;
	benefit: (typeof BENEFITS)[number];
	variant: (typeof VARIANTS)[number];
	placement: (typeof PLACEMENTS)[number];
	consent: boolean;
}

function oneOf<T extends readonly string[]>(list: T, value: unknown): value is T[number] {
	return typeof value === 'string' && list.includes(value);
}

function reject(message: string): never {
	throw createError({ statusCode: 400, statusMessage: 'Bad Request', message });
}

export default defineEventHandler(async (event) => {
	const body = (await readBody<Partial<LeadPayload>>(event)) ?? {};

	const email = String(body.email ?? '')
		.trim()
		.toLowerCase();
	if (!EMAIL_RE.test(email) || email.length > 254) reject('Zadejte prosím platný e‑mail.');
	if (!oneOf(BENEFITS, body.benefit)) reject('Vyberte prosím jednu z výhod.');
	if (body.consent !== true) reject('Bez souhlasu s kontaktováním vás bohužel nemůžeme zařadit.');

	const variant = oneOf(VARIANTS, body.variant) ? body.variant : 'both';
	const placement = oneOf(PLACEMENTS, body.placement) ? body.placement : 'card';

	const sql = useDb();
	await sql`
		INSERT INTO leads (email, benefit, variant, placement)
		VALUES (${email}, ${body.benefit}, ${variant}, ${placement})
		ON CONFLICT (email) DO UPDATE SET
			benefit    = EXCLUDED.benefit,
			variant    = EXCLUDED.variant,
			placement  = EXCLUDED.placement,
			consent_at = now(),
			updated_at = now()
	`;

	return { ok: true as const };
});
