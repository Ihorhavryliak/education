/*
  Warnings:

  - Made the column `url` on table `GeneralProgram` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GeneralProgram" ALTER COLUMN "url" SET NOT NULL;
