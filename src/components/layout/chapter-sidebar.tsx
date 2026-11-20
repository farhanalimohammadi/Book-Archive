
import Link from "next/link";

import { MobileChapterMenu } from "@/components/layout/mobile-chapter-menu";
import type { ChapterSummary } from "@/types/book";

type ChapterSidebarProps = {
  chapters: ChapterSummary[];
  currentSlug?: string;
};

export function ChapterSidebar({
  chapters,
  currentSlug,
}: ChapterSidebarProps) {
  return (
    <>
      <MobileChapterMenu
        chapters={chapters}
        currentSlug={currentSlug}
      />

      <aside
        aria-label="فهرست فصل‌های کتاب"
        className="hidden h-fit w-full rounded-xl border border-border bg-background p-4 lg:sticky lg:top-24 lg:block"
      >
        <div className="mb-5">
          <h2 className="text-base font-bold text-foreground">
            فهرست کتاب
          </h2>

          <p className="mt-1 text-xs text-muted">
            {chapters.length} فصل
          </p>
        </div>

        <nav aria-label="فصل‌ها">
          <ol className="space-y-1">
            {chapters.map((chapter) => {
              const isActive = chapter.slug === currentSlug;

              return (
                <li key={chapter.id}>
                  <Link
                    href={`/chapters/${chapter.slug}`}
                    aria-current={isActive ? "page" : undefined}
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
      </aside>
    </>
  );
}
