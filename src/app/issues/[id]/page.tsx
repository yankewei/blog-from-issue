import { Issue, Label, Prisma, PrismaClient } from "@prisma/client";
import MarkdownIt from "markdown-it";
import { Divider } from "@nextui-org/divider";
import {Link} from "@nextui-org/link";

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


  console.log(issue)

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-50 to-white min-h-screen py-10">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
          <div className="p-6 sm:p-8 md:p-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {issue.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {issue.IssueOnLabel.map((issueOnLabel, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium rounded-full mix-blend-difference shadow-2xl"
                  style={{ backgroundColor: `#${issueOnLabel.Label.color}` }}
                >
                  {issueOnLabel.Label.name}
                </span>
              ))}
            </div>
            <Divider className="my-6 opacity-50" />
            <article
              className="prose prose-base prose-blue max-w-none mt-6"
              dangerouslySetInnerHTML={{ __html: result }}
            ></article>
            <Divider className="my-6 opacity-50" />
            <div>
              <p style={{ display: 'inline' }}>来源：</p>
              <Link href={`https://github.com/${issue.repository.full_name}/issues/${issue.id}`} style={{ display: 'inline' }}>https://github.com/{issue.repository.full_name}/issues/{issue.id}</Link>
            </div>
          </div>
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
    repository: { // Corrected from 'respository' to 'repository'
      full_name: string;
    }
  }
> {
  return new PrismaClient().issue.findUnique({
    include: {
      IssueOnLabel: {
        include: {
          Label: true,
        },
      },
      repository: { // Ensure this matches the corrected type
        select: { full_name: true }
      }
    },
    where: {
      id: id,
    },
  });
}
