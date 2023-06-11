/*
  Warnings:

  - You are about to drop the column `video` on the `Curse` table. All the data in the column will be lost.
  - Added the required column `videoUrl` to the `Curse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curse" DROP COLUMN "video",
ADD COLUMN     "videoUrl" TEXT NOT NULL;
