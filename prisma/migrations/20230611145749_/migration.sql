/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Curse` table. All the data in the column will be lost.
  - Added the required column `video` to the `Curse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curse" DROP COLUMN "videoUrl",
ADD COLUMN     "video" TEXT NOT NULL;
