import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

export default function Page({ params }) {
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );

  const post = `Here is some JavaScript code:

  ~~~go
  func go() {

  }
  ~~~
  `;

  const html_content = marked.parse(post);

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
