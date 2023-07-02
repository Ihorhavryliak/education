/*
  Warnings:

  - You are about to drop the column `teoryId` on the `Complete` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Complete" DROP COLUMN "teoryId",
ADD COLUMN     "theoryId" INTEGER;
