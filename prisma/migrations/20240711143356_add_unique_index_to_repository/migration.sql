/*
  Warnings:

  - A unique constraint covering the columns `[full_name]` on the table `repositories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "repositories_full_name_key" ON "repositories"("full_name");
