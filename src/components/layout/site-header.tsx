
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="صفحه اصلی کتاب"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            BM
          </span>

          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-foreground sm:text-base">
              ساخت میکروسرویس‌ها
            </span>

            <span
              dir="ltr"
              className="block truncate text-xs text-muted"
            >
              Building Microservices
            </span>
          </span>
        </Link>

        <nav
          aria-label="ناوبری اصلی"
          className="flex shrink-0 items-center gap-2"
        >
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            خانه
          </Link>
        </nav>
      </div>
    </header>
  );
}
