/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Curse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `GeneralProgram` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Program` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Curse_url_key" ON "Curse"("url");

-- CreateIndex
CREATE UNIQUE INDEX "GeneralProgram_url_key" ON "GeneralProgram"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Program_url_key" ON "Program"("url");
