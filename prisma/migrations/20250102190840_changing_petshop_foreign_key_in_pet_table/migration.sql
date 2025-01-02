/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `ownerCnpj` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL,
    "deadline_vaccination" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerCnpj" TEXT NOT NULL,
    CONSTRAINT "Pet_ownerCnpj_fkey" FOREIGN KEY ("ownerCnpj") REFERENCES "Petshop" ("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("created_at", "deadline_vaccination", "description", "id", "name", "type", "vaccinated") SELECT "created_at", "deadline_vaccination", "description", "id", "name", "type", "vaccinated" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
