-- DropIndex
DROP INDEX "Certification_name_key";

-- DropIndex
DROP INDEX "Student_name_key";

-- AlterTable
ALTER TABLE "Certification" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "image" TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT;
