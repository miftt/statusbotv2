/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "expireDate" SET DEFAULT (NOW() + INTERVAL '1 month');

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "ItemList" (
    "itemID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,

    CONSTRAINT "ItemList_pkey" PRIMARY KEY ("itemID")
);
