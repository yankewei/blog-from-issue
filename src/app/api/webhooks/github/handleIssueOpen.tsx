import { Issue, PrismaClient } from "@prisma/client";
import { Tiro_Bangla } from "next/font/google";

export async function handleIssueOpen(payload: object): Promise<Issue> {
  const prisma = new PrismaClient();

  const repository_raw = payload["repository"];
  const issue_raw = payload["issue"];

  let repository = await prisma.repository.findUnique({
    where: {
      full_name: repository_raw["full_name"],
    },
    select: {
      id: true,
      full_name: true,
    },
  });

  if (repository === null) {
    repository = await prisma.repository.create({
      data: {
        full_name: repository_raw["full_name"],
      },
    });
  }

  const to_be_created_labels = [];
  if (issue_raw["labels"].length !== 0) {
    issue_raw["labels"].map(
      (label_raw: { name: String; color: String; description: String }) =>
        to_be_created_labels.push({
          Label: {
            create: {
              name: label_raw["name"],
              description: label_raw["description"],
              color: label_raw["color"],
            },
          },
        }),
    );
  }

  const to_be_created_issue = {
    created_at: new Date(),
    repositoryId: repository.id,
    number: issue_raw["number"],
    title: issue_raw["title"],
    body: issue_raw["body"] ?? "",
    IssueOnLabel: null,
  };

  if (to_be_created_labels.length !== 0) {
    to_be_created_issue.IssueOnLabel = {
      create: to_be_created_labels,
    };
  }

  const issue = await prisma.issue.create({
    data: to_be_created_issue,
  });

  return issue;
}
