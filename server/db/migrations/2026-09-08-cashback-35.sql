-- Cashback benefit changed from 5 % to 3,5 %: rename the stored value and replace the CHECK.
-- Run once against Neon before deploying the matching code:
--   psql "$DATABASE_URL_UNPOOLED" -f server/db/migrations/2026-09-08-cashback-35.sql
BEGIN;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_benefit_check;
UPDATE leads SET benefit = 'cashback_35' WHERE benefit = 'cashback_5';
ALTER TABLE leads ADD CONSTRAINT leads_benefit_check CHECK (benefit IN ('discount_3', 'cashback_35'));
COMMIT;
