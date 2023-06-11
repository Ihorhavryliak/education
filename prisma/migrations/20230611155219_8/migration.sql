-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_curseId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_curseId_fkey";

-- CreateTable
CREATE TABLE "_CurseToQuestion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CurseToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CurseToQuestion_AB_unique" ON "_CurseToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_CurseToQuestion_B_index" ON "_CurseToQuestion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CurseToTask_AB_unique" ON "_CurseToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_CurseToTask_B_index" ON "_CurseToTask"("B");

-- AddForeignKey
ALTER TABLE "_CurseToQuestion" ADD CONSTRAINT "_CurseToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Curse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurseToQuestion" ADD CONSTRAINT "_CurseToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurseToTask" ADD CONSTRAINT "_CurseToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "Curse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurseToTask" ADD CONSTRAINT "_CurseToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
