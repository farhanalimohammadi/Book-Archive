
"use client";

import { useState, type FormEvent } from "react";
import { FilePlus2, X, Save } from "lucide-react";

import { useNotes } from "@/components/reader/Notes/note-provider";

type NoteButtonProps = {
  chapterSlug: string;
  blockId: string;
};

export function NoteButton({
  chapterSlug,
  blockId,
}: NoteButtonProps) {
  const { addNote, notes, isLoaded } = useNotes();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const blockNoteCount = notes.filter(
    (note) =>
      note.chapterSlug === chapterSlug &&
      note.blockId === blockId,
  ).length;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("لطفاً عنوان و متن یادداشت را وارد کن.");
      return;
    }

    const success = addNote({
      chapterSlug,
      blockId,
      title,
      content,
    });

    if (!success) {
      setError(
        notes.length >= 500
          ? "ظرفیت یادداشت‌ها تکمیل شده است."
          : "ثبت یادداشت انجام نشد. اطلاعات را بررسی کن.",
      );
      return;
    }

    setTitle("");
    setContent("");
    setIsOpen(false);
  }

  function handleCancel() {
    setIsOpen(false);
    setTitle("");
    setContent("");
    setError("");
  }

  return (
    <div
      data-reader-ui
      className="flex flex-col items-end"
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen((current) => !current);
          setError("");
        }}
        aria-expanded={isOpen}
        className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
      >
        <FilePlus2 size={15} aria-hidden="true" />

        <span>یادداشت جدید</span>

        {blockNoteCount > 0 && (
          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-primary">
            {blockNoteCount}
          </span>
        )}
      </button>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-3 w-full max-w-xl rounded-xl border border-border bg-surface p-4 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold">
                ایجاد یادداشت
              </h3>

              <p className="mt-1 text-xs text-muted">
                این یادداشت به همین بخش از کتاب متصل می‌شود.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              aria-label="بستن فرم یادداشت"
              className="rounded-lg p-2 text-muted transition hover:bg-surface-secondary hover:text-foreground"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>

          <label
            htmlFor={`note-title-${blockId}`}
            className="mb-2 block text-xs font-medium"
          >
            عنوان یادداشت
          </label>

          <input
            id={`note-title-${blockId}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            placeholder="مثلاً: نکته مهم درباره معماری سرویس‌ها"
            required
            className="mb-4 min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />

          <div className="mb-2 flex items-center justify-between gap-2">
            <label
              htmlFor={`note-content-${blockId}`}
              className="text-xs font-medium"
            >
              متن یادداشت
            </label>

            <span className="text-xs text-muted">
              {content.length.toLocaleString("fa-IR")} / ۲۰٬۰۰۰
            </span>
          </div>

          <textarea
            id={`note-content-${blockId}`}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={20000}
            rows={5}
            required
            placeholder="اینجا یادداشت شخصی خودت را بنویس..."
            className="w-full resize-y rounded-lg border border-border bg-background p-3 text-sm leading-7 outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />

          {error && (
            <p role="alert" className="mt-2 text-xs text-red-600">
              {error}
            </p>
          )}

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg px-4 py-2 text-xs font-medium text-muted transition hover:bg-surface-secondary"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={
                !isLoaded ||
                !title.trim() ||
                !content.trim()
              }
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={15} aria-hidden="true" />
              ذخیره یادداشت
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
