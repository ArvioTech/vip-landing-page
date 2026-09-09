-- Page visits, so we can tell which invitee opened the page (the ?e= address from the invitation link)
-- and how many people came in total → conversion = leads / visitors. Apply once:
--   psql "$DATABASE_URL_UNPOOLED" -f server/db/migrations/2026-09-09-visits.sql

CREATE TABLE IF NOT EXISTS visits (
	id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	-- ?e= from the invitation link, lower-cased; NULL when the visitor came without it
	email      text,
	variant    text NOT NULL CHECK (variant IN ('both', 'sleva', 'voucher')),
	-- anonymous per-browser id (cookie dzb_id), so repeat views of one person count once
	visitor_id uuid,
	user_agent text,
	created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS visits_email_idx ON visits (email);
CREATE INDEX IF NOT EXISTS visits_created_at_idx ON visits (created_at DESC);

-- One row per invited e-mail that opened the page: when first, how many times, whether they signed up.
--   SELECT * FROM invitee_stats ORDER BY first_visit DESC;
--   SELECT * FROM invitee_stats WHERE email = 'jmeno@firma.cz';
CREATE OR REPLACE VIEW invitee_stats AS
SELECT
	v.email,
	min(v.created_at)          AS first_visit,
	count(*)                   AS visits,
	bool_or(l.id IS NOT NULL)  AS lead,
	min(l.created_at)          AS lead_at
FROM visits v
LEFT JOIN leads l ON l.email = v.email
WHERE v.email IS NOT NULL
GROUP BY v.email;

-- Totals in one row:  SELECT * FROM visit_stats;
CREATE OR REPLACE VIEW visit_stats AS
SELECT
	count(*)                                                        AS pageviews,
	count(DISTINCT coalesce(email, visitor_id::text, id::text))     AS visitors,
	count(DISTINCT email)                                           AS invitees_opened,
	(SELECT count(*) FROM leads)                                    AS leads,
	round(
		100.0 * (SELECT count(*) FROM leads)
		/ nullif(count(DISTINCT coalesce(email, visitor_id::text, id::text)), 0),
		1
	)                                                               AS conversion_pct
FROM visits;
