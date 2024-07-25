-- AlterTable
ALTER TABLE "User" ALTER COLUMN "expireDate" SET DEFAULT (NOW() + INTERVAL '1 month');
