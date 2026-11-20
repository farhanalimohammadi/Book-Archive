
import Image from "next/image";

import { InlineRenderer } from "@/components/content/inline-renderer";
import type { ContentBlock } from "@/types/book";

type BlockRendererProps = {
  block: ContentBlock;
};

export function BlockRenderer({
  block,
}: BlockRendererProps) {
  switch (block.type) {
    case "heading": {
      const HeadingTag = `h${block.level}` as
        | "h2"
        | "h3"
        | "h4";

      const headingStyles = {
        2: "mt-10 mb-5 text-2xl font-bold",
        3: "mt-8 mb-4 text-xl font-semibold",
        4: "mt-6 mb-3 text-lg font-semibold",
      };

      return (
        <HeadingTag
          id={block.id}
          dir="rtl"
          className={headingStyles[block.level]}
        >
          {block.text}
        </HeadingTag>
      );
    }

    case "paragraph": {
      return (
        <p
          id={block.id}
          dir="rtl"
          className="text-base leading-8 text-foreground"
        >
          <InlineRenderer content={block.content} />
        </p>
      );
    }

    case "image": {
      return (
        <figure
          id={block.id}
          className="my-8 space-y-3"
        >
          <Image
            src={block.src}
            alt={block.alt}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full rounded-lg object-contain"
          />

          {block.caption && (
            <figcaption
              dir="rtl"
              className="text-center text-sm text-muted"
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "table": {
      return (
        <div
          id={block.id}
          dir="rtl"
          className="my-8 w-full overflow-x-auto"
        >
          <table className="w-full border-collapse text-right text-sm">
            <thead>
              <tr>
                {block.headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="border-b border-border bg-surface-secondary px-4 py-3 font-semibold"
                  >
                    <InlineRenderer content={header} />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border-b border-border px-4 py-3 leading-7"
                    >
                      <InlineRenderer content={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "code": {
      return (
        <section
          id={block.id}
          className="my-8 overflow-hidden rounded-lg border border-border"
        >
          <div
            dir="ltr"
            className="border-b border-border bg-surface-secondary px-4 py-2 text-xs text-muted"
          >
            {block.language}
          </div>

          <pre
            dir="ltr"
            className="overflow-x-auto bg-surface-secondary p-4 text-sm leading-7"
          >
            <code className="font-mono">
              {block.content}
            </code>
          </pre>
        </section>
      );
    }

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";

      return (
        <ListTag
          id={block.id}
          dir="rtl"
          className={`my-6 space-y-2 pe-6 leading-8 ${
            block.ordered
              ? "list-decimal"
              : "list-disc"
          }`}
        >
          {block.items.map((item, index) => (
            <li key={index}>
              <InlineRenderer content={item} />
            </li>
          ))}
        </ListTag>
      );
    }

    case "quote": {
      return (
        <blockquote
          id={block.id}
          dir="rtl"
          className="my-8 border-r-4 border-primary pe-5 py-2 text-base leading-8 text-muted"
        >
          <InlineRenderer content={block.content} />
        </blockquote>
      );
    }

    default: {
      return null;
    }
  }
}
