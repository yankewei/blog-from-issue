import { Issue, Label, Prisma, PrismaClient } from "@prisma/client";
import MarkdownIt from "markdown-it";
import hljs from 'highlight.js';
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { ShareButton } from "@/ui/ShareButton";

export async function generateMetadata({ params, searchParams }) {
  const issue = await getIssue(parseInt(params.id));

  return {
    title: issue.title,
    description: issue.body.substring(0, 160),
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await getIssue(parseInt(params.id));
  
  // 配置 MarkdownIt 以支持代码高亮
  const md = new MarkdownIt();
  
  const result = md.render(issue.body);
  const formattedDate = new Date(issue.created_at).toLocaleDateString('zh-CN', {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="flex flex-col items-center min-h-screen py-10 font-mono">
      <div className="w-full max-w-3xl px-4 sm:px-6 mx-auto">
        <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="p-6 sm:p-8 md:p-10">
            {/* 返回按钮 */}
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6 hover:text-primary transition-colors">
              <i className="icon-[tabler--arrow-left] mr-1"></i>
              返回文章列表
            </Link>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              {issue.title}
            </h1>
            
            {/* 发布日期 */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <i className="icon-[tabler--calendar] mr-1 inline-block align-text-bottom"></i>
              {formattedDate}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {issue.IssueOnLabel.map((issueOnLabel, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium rounded-full mix-blend-difference shadow-sm"
                  style={{ backgroundColor: `#${issueOnLabel.Label.color}` }}
                >
                  {issueOnLabel.Label.name}
                </span>
              ))}
            </div>
            
            <Divider className="my-6 opacity-50" />
            
            <article
              className="prose prose-base prose-zinc dark:prose-invert max-w-none mt-6 mx-auto"
              dangerouslySetInnerHTML={{ __html: result }}
            ></article>
            
            <Divider className="my-6 opacity-50" />
            
            <div className="flex justify-between items-center">
              <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                <span>来源：</span>
                <Link 
                  href={`https://github.com/${issue.repository.full_name}/issues/${issue.id}`} 
                  className="inline-flex items-center ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="icon-[tabler--brand-github] mr-1"></i>
                  github.com/{issue.repository.full_name}/issues/{issue.id}
                </Link>
              </div>
              
              {/* 分享按钮 */}
              <ShareButton className="flex justify-between items-center" />
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
    repository: {
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
      repository: {
        select: { full_name: true }
      }
    },
    where: {
      id: id,
    },
  });
}
