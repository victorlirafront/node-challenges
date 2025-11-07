-- Rollback: Drop the users table
-- Este arquivo documenta como reverter esta migration manualmente

-- DropIndex
DROP INDEX IF EXISTS "users_email_key";

-- DropTable
DROP TABLE IF EXISTS "users";

