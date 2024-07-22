// CodeBlock.tsx
import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Choose a style you prefer

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  // Highlight.js may not recognize all language names, so provide a fallback
  const highlightedCode = hljs.highlightAuto(value, [language]).value;
  const style: React.CSSProperties = {
    backgroundColor: "#282a36", // Background color
    color: "#f8f8f2", // Text color
    padding: "1em",
    borderRadius: "10px",
    overflowX: "auto",
  };
  return (
    <pre style={style}>
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
};

export default CodeBlock;
