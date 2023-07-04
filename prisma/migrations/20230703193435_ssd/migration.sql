-- AlterTable
ALTER TABLE "Complete" ADD COLUMN     "solutionTask" TEXT;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "sort" INTEGER;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "solution" TEXT,
ADD COLUMN     "video" TEXT;
