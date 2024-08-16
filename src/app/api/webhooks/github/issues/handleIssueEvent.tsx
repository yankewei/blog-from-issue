import {
  Issue,
  IssueOnLabel,
  Label,
  PrismaClient,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

function handleIssueOpen(payload: object): Promise<Issue> {
  const repository_raw = payload["repository"];
  const issue_raw = payload["issue"];

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
    },
  });
}

async function handleIssueLabeled(payload: {
  issue: { number: number };
  label: { name: string; description: string; color: string };
  repository: { full_name: string };
}): Promise<Label | IssueOnLabel> {
  const [repository, label] = await Promise.all([
    prisma.repository.findUnique({
      where: { full_name: payload.repository.full_name },
    }),
    prisma.label.findFirst({ where: { name: payload.label.name } }),
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

function handleIssueDeleted(payload: {
  issue: { number: number };
  repository: { full_name: string };
}): Promise<Issue> {
  return prisma.repository
    .findUnique({
      where: { full_name: payload.repository.full_name },
    })
    .then((repository) => {
      return prisma.issueOnLabel
        .deleteMany({
          where: {
            Issue: {
              repositoryId: repository.id,
              number: payload.issue.number,
            },
          },
        })
        .then((): Promise<Issue> => {
          return prisma.issue.delete({
            where: {
              repositoryId_number: {
                repositoryId: repository.id,
                number: payload.issue.number,
              },
            },
          });
        });
    });
}

function handleIssueUnlabeled(payload: {
  issue: { number: number };
  label: { name: string };
  repository: { full_name: string };
}): Promise<Prisma.BatchPayload> {
  return prisma.repository
    .findUnique({
      where: { full_name: payload.repository.full_name },
    })
    .then((repository): Promise<Prisma.BatchPayload> => {
      return prisma.issueOnLabel.deleteMany({
        where: {
          Issue: {
            repositoryId: repository.id,
            number: payload.issue.number,
          },
          AND: {
            Label: {
              name: payload.label.name,
            },
          },
        },
      });
    });
}

async function handleIssueEdited(payload: {
  changes: {
    title?: { from: string };
    body?: { from: string };
  };
  issue: { number: number; title: string; body: string };
  repository: { full_name: string };
}): Promise<Issue> {
  const updating_data = {};

  for (const [key, value] of Object.entries(payload.changes)) {
    updating_data[key] = payload.issue[key as keyof typeof payload.issue];
  }

  return prisma.issue
    .findFirst({
      where: {
        repository: {
          full_name: payload.repository.full_name,
        },
        AND: {
          number: payload.issue.number,
        },
      },
    })
    .then((issue): Promise<Issue> => {
      return prisma.issue.update({
        where: { id: issue.id },
        data: updating_data,
      });
    });
}

export {
  handleIssueOpen,
  handleIssueLabeled,
  handleIssueDeleted,
  handleIssueUnlabeled,
  handleIssueEdited,
};
