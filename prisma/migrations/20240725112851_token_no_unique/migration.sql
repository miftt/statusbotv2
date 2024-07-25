-- DropIndex
DROP INDEX "Token_token_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "expireDate" SET DEFAULT (NOW() + INTERVAL '1 month');
