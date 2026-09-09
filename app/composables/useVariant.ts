/**
 * A/B variant of the page. The invitation link carries it once (?v=…); the page then remembers it:
 *   (no param) / ?v=volba → both benefits, the visitor picks one (default)
 *   ?v=sleva    or ?v=a   → the page talks only about the 3 % discount
 *   ?v=cashback or ?v=b   → the page talks only about the 3,5 % cashback
 * Resolution: URL param → cookie (30 days, so a reload or a later visit keeps the same variant) → default.
 * The value lives in shared state, so it survives the URL clean-up done by plugins/clean-url.client.ts.
 */
export type Variant = 'both' | 'sleva' | 'cashback';

const PARAM_TO_VARIANT: Record<string, Variant> = {
	volba: 'both',
	sleva: 'sleva',
	a: 'sleva',
	cashback: 'cashback',
	b: 'cashback',
};

const COOKIE = 'dzb_v';
const THIRTY_DAYS = 60 * 60 * 24 * 30;

export function useVariant() {
	const route = useRoute();
	const cookie = useCookie<Variant | undefined>(COOKIE, { maxAge: THIRTY_DAYS, sameSite: 'lax' });

	return useState<Variant>('variant', () => {
		const raw = route.query.v;
		const value = Array.isArray(raw) ? raw[0] : raw;
		const fromUrl = PARAM_TO_VARIANT[String(value ?? '').toLowerCase()];
		if (fromUrl) {
			cookie.value = fromUrl;
			return fromUrl;
		}
		return cookie.value && cookie.value in { both: 1, sleva: 1, cashback: 1 } ? cookie.value : 'both';
	});
}
