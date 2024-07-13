import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { Issue, PrismaClient } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await getIssue(parseInt(params.id));
  console.log(issue);

  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );

  const html_content = marked.parse(issue.body);

  return (
    <div className="w-full flex justify-between">
      <div className="w-32"></div>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: html_content }}
      ></div>
      <div className="w-32"></div>
    </div>
  );
}

function getIssue(id: Number): Promise<Issue> {
  const prisma = new PrismaClient();

  return prisma.issue.findUnique({
    where: {
      id: id,
    },
  });
}
