import { Issue, Label, Prisma, PrismaClient } from "@prisma/client";
import MarkdownIt from "markdown-it";
import { Divider } from "@nextui-org/divider";

export async function generateMetadata({ params, searchParams }) {
  const issue = await getIssue(parseInt(params.id));

  return {
    title: issue.title,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await getIssue(parseInt(params.id));
  const md = new MarkdownIt();
  const result = md.render(issue.body);

  const labels = issue.IssueOnLabel.map(function (IssueOnLabel, index) {
    return (
      <span
        key={index}
        className="border-1 rounded px-2 mr-1"
        style={{ backgroundColor: `#${IssueOnLabel.Label.color}` }}
      >
        {IssueOnLabel.Label.name}
      </span>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="px-1 py-2 rounded-small border-default-200 dark:border-default-100 w-3/6">
        <div className="subpixel-antialiased text-3xl mb-8">{issue.title}</div>
        <div className="flex flex-row justify-start mb-2 mix-blend-difference">
          {labels}
        </div>
        <Divider />
        <div className="flex justify-center">
          <article
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: result }}
          ></article>
        </div>
      </div>
    </div>
  );
}

function getIssue(id: number): Promise<
  Issue & {
    IssueOnLabel: (Prisma.IssueOnLabelInclude & {
      Label: Label;
    })[];
  }
> {
  return new PrismaClient().issue.findUnique({
    include: {
      IssueOnLabel: {
        include: {
          Label: true,
        },
      },
    },
    where: {
      id: id,
    },
  });
}
