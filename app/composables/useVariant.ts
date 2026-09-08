/**
 * A/B variant of the page, read from the URL:
 *   ?v=volba    → both benefits, the visitor picks one (default)
 *   ?v=sleva    → the page talks only about the 3 % discount
 *   ?v=cashback → the page talks only about the 5 % cashback
 */
export type Variant = 'both' | 'sleva' | 'cashback';

const PARAM_TO_VARIANT: Record<string, Variant> = {
	volba: 'both',
	sleva: 'sleva',
	cashback: 'cashback',
};

export function useVariant() {
	const route = useRoute();
	return computed<Variant>(() => PARAM_TO_VARIANT[String(route.query.v)] ?? 'both');
}
