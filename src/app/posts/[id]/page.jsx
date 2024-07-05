import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Page({ params }) {
  const post = `Here is some JavaScript code:

  ~~~go
  func go() {

  }
  ~~~
  `;
  return (
    <div className="w-full flex justify-between">
      <div className="w-32"></div>
      <div className="w-full">
        <Markdown
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={dark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post}
        </Markdown>
      </div>
      <div className="w-32"></div>
    </div>
  );
}
