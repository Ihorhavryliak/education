-- AlterTable
ALTER TABLE "Curse" ADD COLUMN     "questionId" INTEGER,
ADD COLUMN     "taskId" INTEGER;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "curseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "curseId" DROP NOT NULL;
