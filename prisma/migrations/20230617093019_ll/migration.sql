/*
  Warnings:

  - You are about to drop the column `isComplate` on the `Curse` table. All the data in the column will be lost.
  - You are about to drop the column `isComplate` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `isComplate` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `isComplate` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Curse" DROP COLUMN "isComplate";

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "isComplate";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "isComplate";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "isComplate";

-- CreateTable
CREATE TABLE "_ProgramToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CurseToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TaskToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProgramToUser_AB_unique" ON "_ProgramToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProgramToUser_B_index" ON "_ProgramToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CurseToUser_AB_unique" ON "_CurseToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CurseToUser_B_index" ON "_CurseToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToUser_AB_unique" ON "_TaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToUser_B_index" ON "_TaskToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToUser_AB_unique" ON "_QuestionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToUser_B_index" ON "_QuestionToUser"("B");

-- AddForeignKey
ALTER TABLE "_ProgramToUser" ADD CONSTRAINT "_ProgramToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToUser" ADD CONSTRAINT "_ProgramToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurseToUser" ADD CONSTRAINT "_CurseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Curse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurseToUser" ADD CONSTRAINT "_CurseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD CONSTRAINT "_TaskToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToUser" ADD CONSTRAINT "_QuestionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToUser" ADD CONSTRAINT "_QuestionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
