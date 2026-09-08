/**
 * A/B variant of the page, read from the URL — the link in the invitation e-mail carries it:
 *   (no param) / ?v=volba → both benefits, the visitor picks one (default)
 *   ?v=sleva    or ?v=a   → the page talks only about the 3 % discount
 *   ?v=cashback or ?v=b   → the page talks only about the 5 % cashback
 * Unknown values fall back to the default. The header logo keeps the query, so the variant survives a click on it.
 */
export type Variant = 'both' | 'sleva' | 'cashback';

const PARAM_TO_VARIANT: Record<string, Variant> = {
	volba: 'both',
	sleva: 'sleva',
	a: 'sleva',
	cashback: 'cashback',
	b: 'cashback',
};

export function useVariant() {
	const route = useRoute();
	return computed<Variant>(() => {
		const raw = route.query.v;
		const value = Array.isArray(raw) ? raw[0] : raw;
		return PARAM_TO_VARIANT[String(value ?? '').toLowerCase()] ?? 'both';
	});
}
