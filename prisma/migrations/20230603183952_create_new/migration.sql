/*
  Warnings:

  - Added the required column `shortName` to the `GeneralProgram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneralProgram" ADD COLUMN     "shortName" TEXT NOT NULL;
