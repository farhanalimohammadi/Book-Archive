
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import {
  ChevronDown,
  FileText,
  Pencil,
  Save,
  Trash2,
  X,
  ExternalLink,
} from "lucide-react";

import { useNotes } from "@/components/reader/Notes/note-provider";

type NotePanelProps = {
  chapterSlug: string;
};

export function NotePanel({
  chapterSlug,
}: NotePanelProps) {
  const {
    notes,
    isLoaded,
    updateNote,
    removeNote,
  } = useNotes();

  const [isOpen, setIsOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] =
    useState<string | null>(null);

  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [error, setError] = useState("");

  const chapterNotes = notes
    .filter((note) => note.chapterSlug === chapterSlug)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  function startEditing(
    id: string,
    title: string,
    content: string,
  ) {
    setEditingNoteId(id);
    setEditingTitle(title);
    setEditingContent(content);
    setError("");
  }

  function cancelEditing() {
    setEditingNoteId(null);
    setEditingTitle("");
    setEditingContent("");
    setError("");
  }

  function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingNoteId) {
      return;
    }

    const success = updateNote(editingNoteId, {
      title: editingTitle,
      content: editingContent,
    });

    if (!success) {
      setError("عنوان و متن یادداشت را به‌درستی وارد کن.");
      return;
    }

    cancelEditing();
  }

  function formatDate(timestamp: number) {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(timestamp));
  }

  return (
    <section
      data-reader-ui
      className="mb-6 overflow-hidden rounded-xl border border-border bg-surface"
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="chapter-notes"
        className="flex w-full items-center justify-between gap-3 p-4 text-start transition hover:bg-surface-secondary"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText size={18} aria-hidden="true" />
          </span>

          <span className="min-w-0">
            <span className="block text-sm font-semibold">
              یادداشت‌های شخصی
            </span>

            <span className="mt-1 block text-xs text-muted">
              یادداشت‌های ذخیره‌شده در این فصل
            </span>
          </span>

          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {chapterNotes.length.toLocaleString("fa-IR")}
          </span>
        </span>

        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="chapter-notes"
          className="border-t border-border p-4"
        >
          {!isLoaded ? (
            <p className="py-5 text-center text-sm text-muted">
              در حال بارگذاری یادداشت‌ها...
            </p>
          ) : chapterNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-background text-muted">
                <FileText size={22} aria-hidden="true" />
              </span>

              <p className="text-sm font-medium">
                هنوز یادداشتی ثبت نشده است.
              </p>

              <p className="mt-2 max-w-sm text-xs leading-6 text-muted">
                از دکمه «یادداشت جدید» کنار هر بخش کتاب برای ثبت نکات و
                توضیحات شخصی استفاده کن.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {chapterNotes.map((note) => {
                const isEditing = editingNoteId === note.id;

                return (
                  <li
                    key={note.id}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    {isEditing ? (
                      <form
                        onSubmit={handleUpdate}
                        className="space-y-3"
                      >
                        <div>
                          <label
                            htmlFor={`edit-note-title-${note.id}`}
                            className="mb-2 block text-xs font-medium"
                          >
                            عنوان
                          </label>

                          <input
                            id={`edit-note-title-${note.id}`}
                            value={editingTitle}
                            onChange={(event) =>
                              setEditingTitle(event.target.value)
                            }
                            maxLength={120}
                            required
                            className="min-h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`edit-note-content-${note.id}`}
                            className="mb-2 block text-xs font-medium"
                          >
                            متن یادداشت
                          </label>

                          <textarea
                            id={`edit-note-content-${note.id}`}
                            value={editingContent}
                            onChange={(event) =>
                              setEditingContent(event.target.value)
                            }
                            maxLength={20000}
                            rows={5}
                            required
                            className="w-full resize-y rounded-lg border border-border bg-surface p-3 text-sm leading-7 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                          />
                        </div>

                        {error && (
                          <p role="alert" className="text-xs text-red-600">
                            {error}
                          </p>
                        )}

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs text-muted hover:bg-surface-secondary"
                          >
                            <X size={14} aria-hidden="true" />
                            انصراف
                          </button>

                          <button
                            type="submit"
                            disabled={
                              !editingTitle.trim() ||
                              !editingContent.trim()
                            }
                            className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
                          >
                            <Save size={14} aria-hidden="true" />
                            ذخیره تغییرات
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="break-words text-sm font-semibold leading-6">
                              {note.title}
                            </h3>

                            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-muted">
                              {note.content}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                          <div className="text-xs leading-5 text-muted">
                            <span>
                              آخرین ویرایش: {formatDate(note.updatedAt)}
                            </span>

                            {note.updatedAt > note.createdAt && (
                              <span className="mt-1 block">
                                ایجاد: {formatDate(note.createdAt)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <Link
                              href={`/chapters/${note.chapterSlug}#bookmark-${note.blockId}`}
                              title="رفتن به محل یادداشت"
                              aria-label="رفتن به محل یادداشت"
                              className="rounded-lg p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
                            >
                              <ExternalLink
                                size={16}
                                aria-hidden="true"
                              />
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                startEditing(
                                  note.id,
                                  note.title,
                                  note.content,
                                )
                              }
                              title="ویرایش یادداشت"
                              aria-label="ویرایش یادداشت"
                              className="rounded-lg p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
                            >
                              <Pencil size={16} aria-hidden="true" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                removeNote(note.id);

                                if (editingNoteId === note.id) {
                                  cancelEditing();
                                }
                              }}
                              title="حذف یادداشت"
                              aria-label={`حذف یادداشت ${note.title}`}
                              className="rounded-lg p-2 text-muted transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={16} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
