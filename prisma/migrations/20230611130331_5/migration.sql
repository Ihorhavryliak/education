/*
  Warnings:

  - Added the required column `theory` to the `Curse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curse" ADD COLUMN     "theory" TEXT NOT NULL;
