-- DropForeignKey
ALTER TABLE "Curse" DROP CONSTRAINT "Curse_programId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_generalProgramId_fkey";

-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "generalProgramId" DROP NOT NULL;

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
ALTER TABLE "Program" ADD CONSTRAINT "Program_generalProgramId_fkey" FOREIGN KEY ("generalProgramId") REFERENCES "GeneralProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurseToProgram" ADD CONSTRAINT "_CurseToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "Curse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurseToProgram" ADD CONSTRAINT "_CurseToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
