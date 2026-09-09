/**
 * Records the page visit (POST /api/visits) once the app is up: the ?e= address from the invitation link (if any),
 * the variant shown, and an anonymous per-browser id kept in the `dzb_id` cookie for a year, so one person
 * reloading the page counts as one visitor. Values come from shared state, which survives the URL clean-up.
 * Skipped in dev — `.env.local` points at the production database.
 */
import type { VisitPayload } from '~~/server/api/visits.post';

const COOKIE = 'dzb_id';
const ONE_YEAR = 60 * 60 * 24 * 365;

export default defineNuxtPlugin((nuxtApp) => {
	if (import.meta.dev) return;

	nuxtApp.hook('app:mounted', () => {
		const visitor = useCookie<string | undefined>(COOKIE, { maxAge: ONE_YEAR, sameSite: 'lax' });
		if (!visitor.value) visitor.value = crypto.randomUUID();

		const email = useState<string>('lead-email').value;
		const variant = useVariant().value;

		$fetch('/api/visits', {
			method: 'POST',
			body: { email: email || undefined, variant, visitor: visitor.value } satisfies VisitPayload,
			keepalive: true,
		}).catch(() => {
			// analytics only — never disturb the visitor
		});
	});
});
