/*
  Warnings:

  - The primary key for the `Pet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL,
    "deadline_vaccination" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerCnpj" TEXT NOT NULL,
    CONSTRAINT "Pet_ownerCnpj_fkey" FOREIGN KEY ("ownerCnpj") REFERENCES "Petshop" ("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("created_at", "deadline_vaccination", "description", "id", "name", "ownerCnpj", "type", "vaccinated") SELECT "created_at", "deadline_vaccination", "description", "id", "name", "ownerCnpj", "type", "vaccinated" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
