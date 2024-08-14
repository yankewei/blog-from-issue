import { Issue, PrismaClient } from "@prisma/client";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";

export async function generateMetadata({ params, searchParams }) {
  const issue = await getIssue(parseInt(params.id));

  return {
    title: issue.title,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await getIssue(parseInt(params.id));

  const md = new MarkdownIt("commonmark");

  const result = md.render(issue.body);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-9/12 px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <article
          className="prose prose-slate"
          dangerouslySetInnerHTML={{ __html: result }}
        ></article>
      </div>
    </div>
  );
}

function getIssue(id: number): Promise<Issue> {
  const prisma = new PrismaClient();

  return prisma.issue.findUnique({
    where: {
      id: id,
    },
  });
}
