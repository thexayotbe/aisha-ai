// Markdown.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

interface MarkdownProps {
  text: string;
}

const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  return (
    <ReactMarkdown
      children={text}
      components={{
        code({ className, children, ...props }) {
          const language = className ? className.replace("language-", "") : "";
          const match = /language-(\w+)/.exec(className || "");

          return !match ? (
            <CodeBlock
              language={language}
              value={String(children).replace(/\n$/, "")}
            />
          ) : (
            <code {...props}>{children}</code>
          );
        },
      }}
    />
  );
};

export default Markdown;
