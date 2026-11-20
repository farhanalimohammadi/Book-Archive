
import Link from "next/link";
import { Suspense } from "react";



import { SiteHeader } from "@/components/layout/site-header";
import { ChapterSidebar } from "@/components/layout/chapter-sidebar";
import { BlockRenderer } from "@/components/content/block-renderer";
import { TableOfContents } from "@/components/content/table-of-contents";
import { getTableOfContents } from "@/lib/content/table-of-contents";

import { ReadingPageIndicator } from "@/components/reader/Reading/reading-page-indicator";
import { ReaderSettings } from "@/components/reader/Reading/reader-settings";
import { ReadingProgress } from "@/components/reader/Reading/reading-progress";
import { ReadingPosition } from "@/components/reader/Reading/reading-position";

import { BookmarkProvider } from "@/components/reader/BookMarks/bookmark-provider";
import { BookmarkPanel } from "@/components/reader/BookMarks/bookmark-panel";
import { BookmarkableBlock } from "@/components/reader/bookmarkable-block";

import { HighlightProvider } from "@/components/reader/Highlights/highlight-provider";
import { HighlightToolbar } from "@/components/reader/Highlights/highlight-toolbar";
import { HighlightPanel } from "@/components/reader/Highlights/highlight-panel";

import { NoteProvider } from "@/components/reader/Notes/note-provider";
import { NotePanel } from "@/components/reader/Notes/note-panel";

import {
  getBookManifest,
  getChapterBySlug,
} from "@/lib/content/loader";

type ChapterPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ChapterContentProps = {
  params: ChapterPageProps["params"];
};

async function ChapterContent({
  params,
}: ChapterContentProps) {
  const { slug } = await params;

    const [chapter, book] = await Promise.all([
    getChapterBySlug(slug),
    getBookManifest(),
    ]);

    const tableOfContents = chapter
    ? getTableOfContents(chapter)
    : [];

  const currentChapterIndex = book.chapters.findIndex(
    (item) => item.slug === slug,
  );

  const previousChapter =
    currentChapterIndex > 0
      ? book.chapters[currentChapterIndex - 1]
      : undefined;

  const nextChapter =
    currentChapterIndex >= 0
      ? book.chapters[currentChapterIndex + 1]
      : undefined;

  return (
    <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
      <ChapterSidebar
        chapters={book.chapters}
        currentSlug={slug}
      />

      <main className="min-w-0">
        {!chapter ? (
          <section>
            <h1 className="text-2xl font-bold">
              فصل موردنظر پیدا نشد
            </h1>

            <p className="mt-4 text-muted">
              فصل موردنظر در فهرست کتاب وجود ندارد.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              بازگشت به صفحه اصلی
            </Link>
          </section>
        ) : (
          <>
            <ReadingPosition chapterSlug={slug} />

            <BookmarkProvider>
              <NoteProvider>
                <HighlightProvider chapterSlug={slug}>
                  <header className="mb-10 border-b border-border pb-6">
                    {/* محتوای فعلی Header فصل را بدون تغییر حفظ کن */}
                  </header>

                  <TableOfContents items={tableOfContents} />

                  <BookmarkPanel chapterSlug={slug} />

                  <NotePanel chapterSlug={slug} />

                  <HighlightPanel chapterSlug={slug} />

                  <ReaderSettings>
                    <ReadingPageIndicator
                      totalPages={chapter.pages.length}
                    />

                    <section className="book-content space-y-12">
                      {chapter.pages.map((page) => (
                        <article
                          key={page.id}
                          id={`reader-page-${page.id}`}
                          data-page-id={page.id}
                          data-reader-page-id={page.id}
                          data-reader-page-number={page.number}
                          aria-label={`صفحه ${page.number}`}
                          className="relative space-y-6 border-b border-border pb-12 last:border-b-0"
                        >
                          <div
                            className="flex items-center justify-between border-b border-border/60 pb-3 text-xs text-muted"
                            aria-hidden="true"
                          >
                            <span>صفحه {page.number}</span>
                            <span>فصل {chapter.number}</span>
                          </div>

                          {page.blocks.map((block) => (
                            <BookmarkableBlock
                              key={block.id}
                              chapterSlug={slug}
                              blockId={block.id}
                              title={block.id}
                            >
                              <BlockRenderer block={block} />
                            </BookmarkableBlock>
                          ))}
                        </article>
                      ))}
                    </section>
                  </ReaderSettings>

                  <HighlightToolbar />

                            <nav
                              aria-label="ناوبری فصل‌ها"
                              className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-8"
                            >
                              {previousChapter ? (
                                <Link
                                  href={`/chapters/${previousChapter.slug}`}
                                  className="rounded-lg border border-border px-4 py-3 text-sm transition hover:border-primary hover:text-primary"
                                >
                                  <span className="block text-xs text-muted">
                                    فصل قبلی
                                  </span>
                                  <span className="mt-1 block font-medium">
                                    {previousChapter.title}
                                  </span>
                                </Link>
                              ) : (
                                <div />
                              )}

                              {nextChapter ? (
                                <Link
                                  href={`/chapters/${nextChapter.slug}`}
                                  className="rounded-lg border border-border px-4 py-3 text-end text-sm transition hover:border-primary hover:text-primary"
                                >
                                  <span className="block text-xs text-muted">
                                    فصل بعدی
                                  </span>
                                  <span className="mt-1 block font-medium">
                                    {nextChapter.title}
                                  </span>
                                </Link>
                              ) : (
                                <div />
                              )}
                            </nav>
                </HighlightProvider>
              </NoteProvider>
            </BookmarkProvider>
          </>
        )}
      </main>
    </div>
  );
}

function ChapterFallback() {
  return (
    <main
      className="mx-auto w-full max-w-7xl flex-1 px-6 py-12"
      aria-live="polite"
    >
      <p className="text-muted">
        در حال بارگذاری فصل...
      </p>
    </main>
  );
}

export default function ChapterPage({
  params,
}: ChapterPageProps) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <ReadingProgress />

        <Suspense fallback={<ChapterFallback />}>
          <ChapterContent params={params} />
        </Suspense>
      </div>
    );
}



