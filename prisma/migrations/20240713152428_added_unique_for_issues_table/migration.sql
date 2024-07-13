/*
  Warnings:

  - A unique constraint covering the columns `[repositoryId,number]` on the table `issues` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "issues_repositoryId_number_key" ON "issues"("repositoryId", "number");
