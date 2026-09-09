-- The second benefit is a 3,5 % voucher (was "cashback 5 %"): rename stored values and replace both CHECKs.
--   benefit  cashback_5 → voucher_35
--   variant  cashback   → voucher
-- Run once against Neon before deploying the matching code:
--   psql "$DATABASE_URL_UNPOOLED" -f server/db/migrations/2026-09-09-voucher.sql
BEGIN;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_benefit_check;
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_variant_check;
UPDATE leads SET benefit = 'voucher_35' WHERE benefit IN ('cashback_5', 'cashback_35');
UPDATE leads SET variant = 'voucher' WHERE variant = 'cashback';
ALTER TABLE leads ADD CONSTRAINT leads_benefit_check CHECK (benefit IN ('discount_3', 'voucher_35'));
ALTER TABLE leads ADD CONSTRAINT leads_variant_check CHECK (variant IN ('both', 'sleva', 'voucher'));
COMMIT;
