/*
  Warnings:

  - You are about to drop the `Complite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Complite";

-- CreateTable
CREATE TABLE "Complete" (
    "id" SERIAL NOT NULL,
    "teoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "generalProgramId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Complete_pkey" PRIMARY KEY ("id")
);
