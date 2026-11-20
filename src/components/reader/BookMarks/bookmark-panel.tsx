
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bookmark,
  ChevronDown,
  ExternalLink,
  Trash2,
} from "lucide-react";

import { useBookmarks } from "@/components/reader/BookMarks/bookmark-provider";

type BookmarkPanelProps = {
  chapterSlug: string;
};

export function BookmarkPanel({
  chapterSlug,
}: BookmarkPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    bookmarks,
    isLoaded,
    removeBookmark,
  } = useBookmarks();

  const chapterBookmarks = bookmarks
    .filter((bookmark) => bookmark.chapterSlug === chapterSlug)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <section className="mb-6 overflow-hidden rounded-xl border border-border bg-surface">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="chapter-bookmarks"
        className="flex w-full items-center justify-between gap-3 p-4 text-start transition hover:bg-surface-secondary"
      >
        <span className="flex items-center gap-2">
          <Bookmark size={18} aria-hidden="true" />

          <span className="font-semibold">
            نشانک‌های این فصل
          </span>

          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            {chapterBookmarks.length}
          </span>
        </span>

        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="chapter-bookmarks"
          className="border-t border-border p-4"
        >
          {!isLoaded ? (
            <p className="text-sm text-muted">
              در حال بارگذاری نشانک‌ها...
            </p>
          ) : chapterBookmarks.length === 0 ? (
            <div className="py-4 text-center">
              <Bookmark
                size={24}
                className="mx-auto mb-2 text-muted"
                aria-hidden="true"
              />

              <p className="text-sm text-muted">
                هنوز نشانکی در این فصل ثبت نکرده‌ای.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {chapterBookmarks.map((bookmark) => (
                <li
                  key={bookmark.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <Link
                    href={`/chapters/${bookmark.chapterSlug}#bookmark-${bookmark.blockId}`}
                    onClick={() => setIsOpen(false)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-sm transition hover:text-primary"
                  >
                    <ExternalLink
                      size={15}
                      className="shrink-0"
                      aria-hidden="true"
                    />

                    <span className="truncate">
                      {bookmark.title}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeBookmark(bookmark.id)}
                    aria-label={`حذف نشانک ${bookmark.title}`}
                    title="حذف نشانک"
                    className="rounded-md p-2 text-muted transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
