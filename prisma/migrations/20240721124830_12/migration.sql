-- AlterTable
ALTER TABLE "User" ALTER COLUMN "expireDate" SET DEFAULT (NOW() + INTERVAL '1 month');

-- CreateTable
CREATE TABLE "Item" (
    "itemID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("itemID")
);
