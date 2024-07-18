-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL DEFAULT (NOW() + INTERVAL '1 month'),
    "status_bot" TEXT NOT NULL DEFAULT 'Online',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listBot" (
    "id" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "namaBot" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "world" TEXT NOT NULL,
    "uptime" TEXT NOT NULL,
    "lastUpdate" TEXT NOT NULL,
    "botInfo" TEXT NOT NULL,
    "uniqId" SERIAL NOT NULL,

    CONSTRAINT "listBot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Token_id_key" ON "Token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "listBot_uniqId_key" ON "listBot"("uniqId");

-- CreateIndex
CREATE UNIQUE INDEX "listBot_id_userId_key" ON "listBot"("id", "userId");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listBot" ADD CONSTRAINT "listBot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
