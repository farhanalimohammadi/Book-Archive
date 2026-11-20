
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type { ChapterSummary } from "@/types/book";

type MobileChapterMenuProps = {
  chapters: ChapterSummary[];
  currentSlug?: string;
};

export function MobileChapterMenu({
  chapters,
  currentSlug,
}: MobileChapterMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mb-6 rounded-xl border border-border bg-background p-4 lg:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-chapter-navigation"
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex w-full items-center justify-between gap-3 text-right"
      >
        <span>
          <span className="block text-sm font-bold text-foreground">
            فهرست فصل‌ها
          </span>

          <span className="mt-1 block text-xs text-muted">
            {chapters.length} فصل
          </span>
        </span>

        <ChevronDown
          size={20}
          aria-hidden="true"
          className={`shrink-0 text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <nav
          id="mobile-chapter-navigation"
          aria-label="فصل‌های کتاب"
          className="mt-4 border-t border-border pt-3"
        >
          <ol className="space-y-1">
            {chapters.map((chapter) => {
              const isActive = chapter.slug === currentSlug;

              return (
                <li key={chapter.id}>
                  <Link
                    href={`/chapters/${chapter.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-start gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-foreground hover:bg-surface"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-xs ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-surface-secondary text-muted"
                      }`}
                    >
                      {chapter.number}
                    </span>

                    <span className="min-w-0 leading-6">
                      {chapter.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </section>
  );
}
