-- CreateTable
CREATE TABLE "repositories" (
    "id" SMALLSERIAL NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issues" (
    "id" SMALLSERIAL NOT NULL,
    "number" SMALLINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "repositoryId" INTEGER NOT NULL,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "labels" (
    "id" SMALLSERIAL NOT NULL,
    "name" CHAR(10) NOT NULL,
    "description" VARCHAR(255),
    "color" CHAR(6) NOT NULL,

    CONSTRAINT "labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issue_on_lables" (
    "issueId" SMALLINT NOT NULL,
    "labelId" SMALLINT NOT NULL,

    CONSTRAINT "issue_on_lables_pkey" PRIMARY KEY ("issueId","labelId")
);

-- CreateIndex
CREATE UNIQUE INDEX "repositories_full_name_key" ON "repositories"("full_name");

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_on_lables" ADD CONSTRAINT "issue_on_lables_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_on_lables" ADD CONSTRAINT "issue_on_lables_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "labels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
