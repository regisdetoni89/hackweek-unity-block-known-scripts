/*
  Warnings:

  - You are about to drop the column `scriptId` on the `ScriptUser` table. All the data in the column will be lost.
  - Added the required column `hash` to the `ScriptUser` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScriptUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "steamId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ScriptUser" ("createdAt", "id", "steamId", "updatedAt") SELECT "createdAt", "id", "steamId", "updatedAt" FROM "ScriptUser";
DROP TABLE "ScriptUser";
ALTER TABLE "new_ScriptUser" RENAME TO "ScriptUser";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
