/*
  Warnings:

  - You are about to drop the column `isComplateProgram` on the `Program` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Curse" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "GeneralProgram" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "isComplateProgram",
ADD COLUMN     "url" TEXT;
