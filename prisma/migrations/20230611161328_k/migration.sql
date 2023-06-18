/*
  Warnings:

  - You are about to drop the column `questionId` on the `Curse` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `Curse` table. All the data in the column will be lost.
  - You are about to drop the `_CurseToQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CurseToTask` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `curseId` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `curseId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_CurseToQuestion" DROP CONSTRAINT "_CurseToQuestion_A_fkey";

-- DropForeignKey
ALTER TABLE "_CurseToQuestion" DROP CONSTRAINT "_CurseToQuestion_B_fkey";

-- DropForeignKey
ALTER TABLE "_CurseToTask" DROP CONSTRAINT "_CurseToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_CurseToTask" DROP CONSTRAINT "_CurseToTask_B_fkey";

-- AlterTable
ALTER TABLE "Curse" DROP COLUMN "questionId",
DROP COLUMN "taskId";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "curseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "curseId" SET NOT NULL;

-- DropTable
DROP TABLE "_CurseToQuestion";

-- DropTable
DROP TABLE "_CurseToTask";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_curseId_fkey" FOREIGN KEY ("curseId") REFERENCES "Curse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_curseId_fkey" FOREIGN KEY ("curseId") REFERENCES "Curse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
