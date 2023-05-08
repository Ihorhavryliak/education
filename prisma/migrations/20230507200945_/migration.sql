-- DropForeignKey
ALTER TABLE "Curse" DROP CONSTRAINT "Curse_programId_fkey";

-- AlterTable
ALTER TABLE "Curse" ALTER COLUMN "programId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Curse" ADD CONSTRAINT "Curse_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;
