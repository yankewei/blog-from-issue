import { Issue, PrismaClient } from "@prisma/client";

export function handleIssueOpen(payload: JSON): Promise<Issue> {
  const prisma = new PrismaClient();

  const repository_raw = payload["repository"];
  const issue_raw = payload["issue"];

  const IssueOnLabel = [];

  if (issue_raw["labels"].length !== 0) {
    issue_raw["labels"].map(
      (label_raw: { name: String; color: String; description: String }) =>
        IssueOnLabel.push({
          where: { name: label_raw["name"] },
          create: {
            name: label_raw["name"],
            description: label_raw["description"],
            color: label_raw["color"],
          },
        }),
    );
  }

  return prisma.issue.create({
    data: {
      created_at: new Date(),
      repository: {
        connectOrCreate: {
          where: { full_name: repository_raw["full_name"] },
          create: { full_name: repository_raw["full_name"] },
        },
      },
      number: issue_raw["number"],
      title: issue_raw["title"],
      body: issue_raw["body"] ?? "",
      IssueOnLabel: {
        connectOrCreate: IssueOnLabel,
      },
    },
  });
}
