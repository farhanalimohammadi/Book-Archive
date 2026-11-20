
import type { Chapter } from "@/types/book";

export type TableOfContentsItem = {
  id: string;
  title: string;
  level: 2 | 3 | 4;
};

export function getTableOfContents(
  chapter: Chapter,
): TableOfContentsItem[] {
  return chapter.pages.flatMap((page) =>
    page.blocks
      .filter((block) => block.type === "heading")
      .map((block) => ({
        id: block.id,
        title: block.text,
        level: block.level,
      })),
  );
}
