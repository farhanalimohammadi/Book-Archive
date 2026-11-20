
"use client";

import { useState, type FormEvent } from "react";
import { Bookmark, BookmarkCheck, X } from "lucide-react";

import { useBookmarks } from "@/components/reader/BookMarks/bookmark-provider";

type BookmarkButtonProps = {
  chapterSlug: string;
  blockId: string;
  title: string;
};

export function BookmarkButton({
  chapterSlug,
  blockId,
  title,
}: BookmarkButtonProps) {
  const {
    addBookmark,
    removeBookmark,
    getBookmark,
  } = useBookmarks();

  const [isEditing, setIsEditing] = useState(false);
  const [bookmarkTitle, setBookmarkTitle] = useState(title);

  const bookmark = getBookmark(chapterSlug, blockId);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!bookmarkTitle.trim()) {
      return;
    }

    addBookmark(chapterSlug, blockId, bookmarkTitle);
    setIsEditing(false);
  }

  if (bookmark) {
    return (
      <button
        type="button"
        onClick={() => removeBookmark(bookmark.id)}
        aria-label={`حذف نشانک ${bookmark.title}`}
        title="حذف نشانک"
        className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary transition hover:bg-primary/10"
      >
        <BookmarkCheck size={16} aria-hidden="true" />
        نشانک‌گذاری شده
      </button>
    );
  }

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-2"
      >
        <label htmlFor={`bookmark-title-${blockId}`} className="sr-only">
          عنوان نشانک
        </label>

        <input
          id={`bookmark-title-${blockId}`}
          autoFocus
          value={bookmarkTitle}
          onChange={(event) => setBookmarkTitle(event.target.value)}
          maxLength={120}
          required
          placeholder="عنوان نشانک"
          className="min-w-0 rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-primary"
        />

        <button
          type="submit"
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90"
        >
          ذخیره
        </button>

        <button
          type="button"
          onClick={() => setIsEditing(false)}
          aria-label="انصراف"
          className="rounded-md p-1.5 text-muted hover:bg-surface-secondary"
        >
          <X size={16} />
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setBookmarkTitle(title);
        setIsEditing(true);
      }}
      aria-label={`افزودن نشانک برای ${title}`}
      title="افزودن نشانک"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted transition hover:border-primary hover:text-primary"
    >
      <Bookmark size={16} aria-hidden="true" />
      افزودن نشانک
    </button>
  );
}
