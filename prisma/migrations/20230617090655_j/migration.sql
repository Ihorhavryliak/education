-- AlterTable
ALTER TABLE "Curse" ADD COLUMN     "isComplate" TEXT[],
ADD COLUMN     "sort" INTEGER;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "isComplate" TEXT[];

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "isComplate" TEXT[];

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isComplate" TEXT[];
