-- Leads collected by the landing page form. Apply once against the Neon database:
--   psql "$DATABASE_URL_UNPOOLED" -f server/db/schema.sql
-- One row per e-mail; a repeated sign-up just refreshes the chosen benefit (see server/api/leads.post.ts).

CREATE TABLE IF NOT EXISTS leads (
	id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	email      text NOT NULL UNIQUE,
	benefit    text NOT NULL CHECK (benefit IN ('discount_3', 'cashback_5')),
	-- A/B variant of the page the visitor saw (?v=volba | sleva | cashback)
	variant    text NOT NULL CHECK (variant IN ('both', 'sleva', 'cashback')),
	-- Which of the two forms on the page was used
	placement  text NOT NULL CHECK (placement IN ('card', 'band')),
	consent_at timestamptz NOT NULL DEFAULT now(),
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
