/**
 * Vercel Web Analytics (enabled on the Vercel project). The invitation link carries the visitor's e-mail in ?e=,
 * so the URL is scrubbed before every event leaves the browser — Vercel only ever sees the variant and utm_* params.
 * Wired by hand rather than via `@vercel/analytics/nuxt`, because the module offers no beforeSend hook.
 */
import { inject } from '@vercel/analytics';

export default defineNuxtPlugin(() => {
	inject({
		framework: 'nuxt',
		beforeSend(event) {
			try {
				const url = new URL(event.url);
				if (!url.searchParams.has('e')) return event;
				url.searchParams.delete('e');
				return { ...event, url: url.toString() };
			} catch {
				return event;
			}
		},
	});
});
