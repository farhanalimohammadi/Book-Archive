
"use client";

import type { ReactNode } from "react";

import { BookmarkButton } from "@/components/reader/BookMarks/bookmark-button";
import { NoteButton } from "@/components/reader/Notes/note-button";

type BookmarkableBlockProps = {
  chapterSlug: string;
  blockId: string;
  title: string;
  children: ReactNode;
};

export function BookmarkableBlock({
  chapterSlug,
  blockId,
  title,
  children,
}: BookmarkableBlockProps) {
  return (
    <div
      id={`bookmark-${blockId}`}
      data-highlight-block
      data-chapter-slug={chapterSlug}
      data-block-id={blockId}
      className="group relative min-w-0"
    >
      <div
        data-reader-ui
        className="mb-3 flex flex-wrap items-center justify-end gap-2"
      >
        <BookmarkButton
          chapterSlug={chapterSlug}
          blockId={blockId}
          title={title}
        />

        <NoteButton
          chapterSlug={chapterSlug}
          blockId={blockId}
        />
      </div>

      {children}
    </div>
  );
}
