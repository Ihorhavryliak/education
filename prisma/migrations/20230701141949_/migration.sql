/*
  Warnings:

  - You are about to drop the column `isCompleteProgramId` on the `Complete` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Complete" DROP COLUMN "isCompleteProgramId",
ADD COLUMN     "completeProgramId" INTEGER;
