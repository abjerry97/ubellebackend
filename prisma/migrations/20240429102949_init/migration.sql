-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ACTIVE', 'DELETED', 'SUSPENDED');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "name" VARCHAR(255) NOT NULL,
    "nin" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "regNo" VARCHAR(255) NOT NULL,
    "program" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_name_key" ON "Student"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nin_key" ON "Student"("nin");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_regNo_key" ON "Student"("regNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_program_key" ON "Student"("program");

-- CreateIndex
CREATE UNIQUE INDEX "Student_state_key" ON "Student"("state");

-- CreateIndex
CREATE UNIQUE INDEX "Certification_name_key" ON "Certification"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Certification_link_key" ON "Certification"("link");

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
