import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { ChapterSidebar } from "@/components/layout/chapter-sidebar";
import { getBookManifest } from "@/lib/content/loader";

async function HomeContent() {
  const book = await getBookManifest();
  const firstChapter = book.chapters[0];

  return (
    <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
      <ChapterSidebar chapters={book.chapters} />

      <main className="min-w-0">
        <section className="overflow-hidden rounded-2xl border border-border bg-background">
          <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-center md:gap-10">
            <div className="mx-auto w-full max-w-[220px]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-surface shadow-md">
                <Image
                  src={book.cover}
                  alt={`جلد کتاب ${book.title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 220px, 220px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-primary">
                نسخه فارسی
              </p>

              <h1 className="mt-3 text-2xl font-bold leading-relaxed text-foreground sm:text-3xl">
                {book.title}
              </h1>

              <p
                dir="ltr"
                className="mt-2 text-sm text-muted"
              >
                {book.originalTitle}
              </p>

              <p className="mt-6 leading-8 text-muted">
                {book.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
                <span>
                  نویسنده: {book.author}
                </span>

                <span>
                  {book.chapters.length} فصل
                </span>
              </div>

              {firstChapter && (
                <div className="mt-8">
                  <Link
                    href={`/chapters/${firstChapter.slug}`}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    شروع مطالعه
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function HomeFallback() {
  return (
    <main
      className="mx-auto w-full max-w-7xl flex-1 px-6 py-12"
      aria-live="polite"
    >
      <p className="text-muted">
        در حال بارگذاری کتاب...
      </p>
    </main>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <Suspense fallback={<HomeFallback />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}