import { Issue, IssueOnLabel, Label, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function handleIssueOpen(payload: object): Promise<Issue> {
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

async function handleIssueLabeled(payload: {
  issue: { number: number };
  label: { name: string; description: string; color: string };
  repository: { full_name: string };
}): Promise<Label | IssueOnLabel> {
  const [repository, label] = await Promise.all([
    prisma.repository.findUnique({ where: { full_name: payload.repository.full_name } }),
    prisma.label.findFirst({ where: { name: payload.label.name } })
  ]);

  const issue = await prisma.issue.findUnique({
    where: {
      repositoryId_number: {
        repositoryId: repository.id,
        number: payload.issue.number,
      },
    },
  });

  if (label === null) {
    return prisma.label.create({
      data: {
        name: payload.label.name,
        description: payload.label.description,
        color: payload.label.color,
        IssueOnLabel: {
          create: { issueId: issue.id },
        },
      },
    });
  }

  return prisma.issueOnLabel.create({
    data: {
      issueId: issue.id,
      labelId: label.id,
    },
  });
}

export { handleIssueOpen, handleIssueLabeled };