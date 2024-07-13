import HomeList from "@/ui/home/List";
import { Prisma, Issue, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export default async function Page(request: NextRequest) {
  console.log(request);
  const issues = await getIssues(1);

  return <HomeList issues={issues}></HomeList>;
}

async function getIssues(page: number): Promise<Issue[]> {
  const limit = 20;
  const prisma = new PrismaClient();

  return await prisma.issue.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
}
