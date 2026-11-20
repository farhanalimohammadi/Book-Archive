
"use client";

import { useEffect, useState } from "react";

type ReadingPageIndicatorProps = {
  totalPages: number;
};

export function ReadingPageIndicator({
  totalPages,
}: ReadingPageIndicatorProps) {
  const [activePage, setActivePage] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const pages = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reader-page-id]",
      ),
    );

    if (pages.length === 0) {
      return;
    }

    function updateActivePage() {
      const referenceY = window.innerHeight * 0.5;

      let closestPage: HTMLElement | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const page of pages) {
        const rect = page.getBoundingClientRect();

        if (rect.top <= referenceY && rect.bottom >= referenceY) {
          closestPage = page;
          break;
        }

        const distance = Math.min(
          Math.abs(rect.top - referenceY),
          Math.abs(rect.bottom - referenceY),
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestPage = page;
        }
      }

      const pageNumber = Number(
        closestPage?.dataset.readerPageNumber,
      );

      if (Number.isInteger(pageNumber) && pageNumber > 0) {
        setActivePage(pageNumber);
      }
    }

    const observer = new IntersectionObserver(
        () => {
            updateActivePage();
        },
        {
            root: null,
            rootMargin: "-45% 0px -45% 0px",
            threshold: 0,
        },
    );

    pages.forEach((page) => observer.observe(page));

    updateActivePage();

    window.addEventListener("resize", updateActivePage);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateActivePage);
    };
  }, []);

  return (
    <div
      className="mb-4 flex items-center justify-between text-sm text-muted"
      aria-live="polite"
      aria-atomic="true"
    >
      <span>
        {activePage !== null
          ? `صفحه ${activePage}`
          : "در حال تشخیص صفحه..."}
      </span>

      <span>
        از {totalPages} صفحه
      </span>
    </div>
  );
}
