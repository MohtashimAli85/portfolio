import React from "react";

const FileContent = ({ children }: { children: React.ReactNode }) => {
  const formattedLines = [
    "/**",
    ...(children
      ?.toString()
      .split("\n")
      .map((line) => ` * ${line.trim()}`) || []),
    " */",
  ].map((text, index) => ({ lineNumber: index + 1, text }));
  return (
    <div className="[counter-reset:line] whitespace-pre-wrap font-mono xl:text-lg text-theme-foreground">
      {formattedLines.map((line) => (
        <div
          key={line.lineNumber}
          className="table-row [counter-increment:line]"
        >
          {/* CSS Counter handles the numbering perfectly */}
          <span className="table-cell text-right text-theme-foreground pr-10 select-none before:content-[counter(line)]" />
          <span className="table-cell">{line.text}</span>
        </div>
      ))}
    </div>
  );
};

export { FileContent };
