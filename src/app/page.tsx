import HomeList from "@/ui/home/List";
import { Issue, Prisma, PrismaClient } from "@prisma/client";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const issues = await getIssues(searchParams.page ?? 1);

  return <HomeList issues={issues}></HomeList>;
}

async function getIssues(page: number): Promise<Issue[]> {
  const limit = 20;
  const prisma = new PrismaClient();

  return await prisma.issue.findMany({
    orderBy: { created_at: Prisma.SortOrder.desc },
    skip: (page - 1) * limit,
    take: limit,
  });
}
