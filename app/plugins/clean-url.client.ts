/**
 * Once the page is up, drop the invitation parameters (?v= variant, ?e= e-mail) from the address bar.
 * Their values are already in shared state (useVariant, useEmailParam) and in cookie / sessionStorage,
 * so a reload keeps them; sharing or bookmarking the URL does not carry the e-mail along.
 * Everything else (utm_*, …) stays. replaceState keeps vue-router's history entry intact.
 */
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook('app:mounted', () => {
		const url = new URL(window.location.href);
		if (!url.searchParams.has('v') && !url.searchParams.has('e')) return;
		url.searchParams.delete('v');
		url.searchParams.delete('e');
		window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
	});
});
