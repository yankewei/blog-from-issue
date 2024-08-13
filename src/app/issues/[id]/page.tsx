import { Issue, PrismaClient } from "@prisma/client";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await getIssue(parseInt(params.id));

  const md = new MarkdownIt("commonmark", {
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre><code class="hljs border-solid border-1 border-gray-300 rounded my-3">' +
                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                 '</code></pre>';
        } catch (__) {}
      }
  
      return '<pre><code class="hljs border-solid border-1 border-gray-300 rounded my-3">' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });

  const result = md.render(issue.body);

  return (
    <div className="w-full flex justify-between">
      <div className="w-32"></div>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: result }}
      ></div>
      <div className="w-32"></div>
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
