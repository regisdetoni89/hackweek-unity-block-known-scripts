/*
  Warnings:

  - A unique constraint covering the columns `[hash,steamId]` on the table `ScriptUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ScriptUser_hash_steamId_key" ON "ScriptUser"("hash", "steamId");
