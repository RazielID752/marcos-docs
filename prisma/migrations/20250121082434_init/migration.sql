/*
  Warnings:

  - Added the required column `caminho` to the `arquivos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_arquivos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "caminho" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataEnvio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alunoId" INTEGER NOT NULL,
    CONSTRAINT "arquivos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_arquivos" ("alunoId", "dataEnvio", "id", "nome", "tipo") SELECT "alunoId", "dataEnvio", "id", "nome", "tipo" FROM "arquivos";
DROP TABLE "arquivos";
ALTER TABLE "new_arquivos" RENAME TO "arquivos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
