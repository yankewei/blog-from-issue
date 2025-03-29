import HomeList from "@/ui/home/List";
import { Issue, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 10;
  
  const issues = await getIssues(currentPage);
  const totalCount = await getTotalIssueCount();
  const totalPages = Math.ceil(totalCount / limit);

  return <HomeList issues={issues} currentPage={currentPage} totalPages={totalPages} />;
}

async function getIssues(page: number): Promise<Issue[]> {
  const limit = 10;

  return await prisma.issue.findMany({
    orderBy: { created_at: Prisma.SortOrder.desc },
    skip: (page - 1) * limit,
    take: limit,
  });
}

async function getTotalIssueCount(): Promise<number> {
  return await prisma.issue.count();
}
