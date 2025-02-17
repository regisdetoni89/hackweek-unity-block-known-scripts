/*
  Warnings:

  - Added the required column `isMalicious` to the `Script` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Script" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "isMalicious" BOOLEAN NOT NULL,
    "usage" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Script" ("content", "createdAt", "hash", "id", "updatedAt", "usage", "verified") SELECT "content", "createdAt", "hash", "id", "updatedAt", "usage", "verified" FROM "Script";
DROP TABLE "Script";
ALTER TABLE "new_Script" RENAME TO "Script";
CREATE UNIQUE INDEX "Script_hash_key" ON "Script"("hash" DESC);
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
