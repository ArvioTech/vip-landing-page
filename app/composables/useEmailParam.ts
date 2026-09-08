/**
 * E-mail pre-filled from the invitation link: ?e=jmeno@firma.cz
 * The mail merge already knows the address, so the visitor only confirms it and ticks the consent.
 * Kept in shared state (survives the URL clean-up) and in sessionStorage (survives a reload of the tab, nothing more —
 * it is personal data, so no cookie). Both forms (hero card, CTA band) read it.
 */
const STORAGE_KEY = 'dzb_e';

export function useEmailParam() {
	const route = useRoute();
	const email = useState<string>('lead-email', () => {
		const raw = route.query.e;
		const value = Array.isArray(raw) ? raw[0] : raw;
		// vue-router decodes "+" in a query as a space; an e-mail never contains one, so put the "+" back
		return String(value ?? '')
			.trim()
			.replace(/ /g, '+');
	});

	// After hydration only, so the server-rendered markup and the first client render match
	onMounted(() => {
		try {
			if (email.value) sessionStorage.setItem(STORAGE_KEY, email.value);
			else email.value = sessionStorage.getItem(STORAGE_KEY) ?? '';
		} catch {
			// storage blocked — the field simply stays empty
		}
	});

	return email;
}
