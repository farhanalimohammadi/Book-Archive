
import Link from "next/link";

import type { TableOfContentsItem } from "@/lib/content/table-of-contents";

type TableOfContentsProps = {
  items: TableOfContentsItem[];
};

export function TableOfContents({
  items,
}: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="فهرست مطالب این فصل"
      className="mb-10 rounded-xl border border-border bg-surface p-5 sm:p-6"
    >
      <h2 className="text-base font-bold text-foreground">
        فهرست مطالب
      </h2>

      <ol className="mt-4 space-y-2">
        {items.map((item) => {
          const indentation = {
            2: "pe-0",
            3: "pe-4",
            4: "pe-8",
          };

          return (
            <li
              key={item.id}
              className={indentation[item.level]}
            >
              <Link
                href={`#${item.id}`}
                className="block rounded-md py-1 text-sm leading-7 text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
