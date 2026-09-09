/**
 * POST /api/visits — one row per page load, sent by plugins/visit.client.ts after hydration
 * (so mail-client link scanners, which do not run JS, are not counted).
 * Body: { email?, variant, visitor }. `email` is the ?e= address from the invitation link, `visitor` the anonymous cookie id.
 */
const VARIANTS = ['both', 'sleva', 'voucher'] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface VisitPayload {
	email?: string;
	variant: (typeof VARIANTS)[number];
	visitor?: string;
}

export default defineEventHandler(async (event) => {
	const body = (await readBody<Partial<VisitPayload>>(event)) ?? {};

	const rawEmail = String(body.email ?? '')
		.trim()
		.toLowerCase();
	const email = EMAIL_RE.test(rawEmail) && rawEmail.length <= 254 ? rawEmail : null;
	const variant = VARIANTS.includes(body.variant as VisitPayload['variant']) ? body.variant : 'both';
	const visitor = UUID_RE.test(String(body.visitor ?? '')) ? String(body.visitor).toLowerCase() : null;
	const userAgent = getRequestHeader(event, 'user-agent')?.slice(0, 255) ?? null;

	const sql = useDb();
	await sql`
		INSERT INTO visits (email, variant, visitor_id, user_agent)
		VALUES (${email}, ${variant}, ${visitor}, ${userAgent})
	`;

	return { ok: true as const };
});
