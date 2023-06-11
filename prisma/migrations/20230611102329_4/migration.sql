/*
  Warnings:

  - You are about to drop the `_MyRelationTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MyRelationTable" DROP CONSTRAINT "_MyRelationTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_MyRelationTable" DROP CONSTRAINT "_MyRelationTable_B_fkey";

-- AlterTable
ALTER TABLE "Curse" ADD COLUMN     "programId" INTEGER;

-- DropTable
DROP TABLE "_MyRelationTable";

-- CreateTable
CREATE TABLE "_CurseToProgram" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CurseToProgram_AB_unique" ON "_CurseToProgram"("A", "B");

-- CreateIndex
CREATE INDEX "_CurseToProgram_B_index" ON "_CurseToProgram"("B");

-- AddForeignKey
ALTER TABLE "_CurseToProgram" ADD CONSTRAINT "_CurseToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "Curse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurseToProgram" ADD CONSTRAINT "_CurseToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
