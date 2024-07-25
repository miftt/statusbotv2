-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "expireDate" SET DEFAULT (NOW() + INTERVAL '1 month');

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
