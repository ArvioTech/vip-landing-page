import { neon } from '@neondatabase/serverless';

let sql: ReturnType<typeof neon> | undefined;

/**
 * Neon HTTP client (serverless-friendly: one fetch per query, no connection pool to keep warm).
 * `DATABASE_URL` is injected by the Neon ↔ Vercel integration; locally it comes from `.env.local` (`vercel env pull`).
 */
export function useDb() {
	if (!sql) {
		const url = process.env.DATABASE_URL;
		if (!url) {
			throw createError({ statusCode: 500, statusMessage: 'DATABASE_URL is not set' });
		}
		sql = neon(url);
	}
	return sql;
}
