"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CommentHighlighterProps {
  code: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CommentHighlighter({
  code,
  className,
  showLineNumbers = true,
}: CommentHighlighterProps) {
  // Process text line-by-line to track comment states cleanly
  const highlightedLines = React.useMemo(() => {
    const rawLines = code.split("\n");
    let inBlockComment = false;

    return rawLines.map((line, index) => {
      const segments: { text: string; isComment: boolean; offset: number }[] =
        [];
      let remaining = line;

      while (remaining.length > 0) {
        const offset = line.length - remaining.length;

        if (inBlockComment) {
          const endIdx = remaining.search(/\*\//);
          if (endIdx === -1) {
            segments.push({ text: remaining, isComment: true, offset });
            break;
          } else {
            segments.push({
              text: remaining.slice(0, endIdx + 2),
              isComment: true,
              offset,
            });
            remaining = remaining.slice(endIdx + 2);
            inBlockComment = false;
          }
        } else {
          const singleIdx = remaining.search(/\/\//);
          const blockIdx = remaining.search(/\/\*/);

          const hasSingle = singleIdx !== -1;
          const hasBlock = blockIdx !== -1;

          // No comments left on this line
          if (!hasSingle && !hasBlock) {
            segments.push({ text: remaining, isComment: false, offset });
            break;
          }

          // Line comment comes first
          if (hasSingle && (!hasBlock || singleIdx < blockIdx)) {
            if (singleIdx > 0) {
              segments.push({
                text: remaining.slice(0, singleIdx),
                isComment: false,
                offset,
              });
            }
            segments.push({
              text: remaining.slice(singleIdx),
              isComment: true,
              offset: offset + singleIdx,
            });
            break;
          } else {
            // Block comment comes first
            if (blockIdx > 0) {
              segments.push({
                text: remaining.slice(0, blockIdx),
                isComment: false,
                offset,
              });
            }
            remaining = remaining.slice(blockIdx);
            inBlockComment = true;
          }
        }
      }

      // Safeguard for completely empty lines
      if (segments.length === 0) {
        segments.push({ text: "", isComment: inBlockComment, offset: 0 });
      }

      return { lineNumber: index + 1, segments };
    });
  }, [code]);

  return (
    <div className="overflow-x-auto p-4">
      <pre className=" text-sm leading-6 min-w-full">
        <code className="block text-theme-foreground">
          {highlightedLines.map(({ lineNumber, segments }) => (
            <div key={lineNumber} className="table-row">
              {showLineNumbers && (
                <span className="table-cell select-none pr-4 text-right  text-xs w-10 align-top pt-px">
                  {lineNumber}
                </span>
              )}
              <span className="table-cell whitespace-pre align-top">
                {segments.map((seg) => (
                  <span
                    key={`${lineNumber}-${seg.offset}-${seg.text.length}`}
                    className={cn(seg.isComment && " font-medium")}
                  >
                    {seg.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
