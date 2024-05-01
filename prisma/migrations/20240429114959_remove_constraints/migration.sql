-- DropIndex
DROP INDEX "Student_program_key";

-- DropIndex
DROP INDEX "Student_state_key";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "program" SET DATA TYPE TEXT,
ALTER COLUMN "state" SET DATA TYPE TEXT;
