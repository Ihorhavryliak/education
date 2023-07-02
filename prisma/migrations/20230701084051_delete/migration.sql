/*
  Warnings:

  - You are about to drop the `_CurseToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProgramToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TaskToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CurseToUser" DROP CONSTRAINT "_CurseToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CurseToUser" DROP CONSTRAINT "_CurseToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProgramToUser" DROP CONSTRAINT "_ProgramToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProgramToUser" DROP CONSTRAINT "_ProgramToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToUser" DROP CONSTRAINT "_QuestionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToUser" DROP CONSTRAINT "_QuestionToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_TaskToUser" DROP CONSTRAINT "_TaskToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskToUser" DROP CONSTRAINT "_TaskToUser_B_fkey";

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "isComplateProgram" INTEGER[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" INTEGER;

-- DropTable
DROP TABLE "_CurseToUser";

-- DropTable
DROP TABLE "_ProgramToUser";

-- DropTable
DROP TABLE "_QuestionToUser";

-- DropTable
DROP TABLE "_TaskToUser";

-- CreateTable
CREATE TABLE "Complite" (
    "id" SERIAL NOT NULL,
    "teoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "generalProgramId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Complite_pkey" PRIMARY KEY ("id")
);
