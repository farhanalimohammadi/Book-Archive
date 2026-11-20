
import type { ReactNode } from "react";
import Link from "next/link";

import type { InlineContent } from "@/types/book";

type InlineRendererProps = {
  content: InlineContent[];
};

function applyTextMarks(
  content: ReactNode,
  marks?: ("bold" | "italic")[],
): ReactNode {
  let result = content;

  if (marks?.includes("italic")) {
    result = <em>{result}</em>;
  }

  if (marks?.includes("bold")) {
    result = <strong>{result}</strong>;
  }

  return result;
}

export function InlineRenderer({
  content,
}: InlineRendererProps) {
  return (
    <>
      {content.map((item, index) => {
        switch (item.type) {
          case "text": {
            return (
              <bdi
                key={index}
                dir={item.direction ?? "auto"}
              >
                {applyTextMarks(item.value, item.marks)}
              </bdi>
            );
          }

          case "term": {
            return (
              <bdi
                key={index}
                dir="auto"
                data-term-id={item.termId}
                className="underline decoration-dotted underline-offset-4"
              >
                {item.value}
              </bdi>
            );
          }


          case "link": {
            const href = `/chapters/${item.target.chapterSlug}${
                item.target.blockId
                ? `#${item.target.blockId}`
                : ""
            }`;

            return (
                <Link
                key={index}
                href={href}
                className="text-primary underline underline-offset-4 transition-opacity hover:opacity-75"
                >
                <bdi dir="auto">{item.label}</bdi>
                </Link>
            );
            }


          case "inlineCode": {
            return (
              <code
                key={index}
                dir="ltr"
                className="rounded bg-surface-secondary px-1.5 py-0.5 font-mono text-sm"
              >
                {item.value}
              </code>
            );
          }

          default: {
            return null;
          }
        }
      })}
    </>
  );
}
