/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Script` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Script_hash_key" ON "Script"("hash" DESC);
