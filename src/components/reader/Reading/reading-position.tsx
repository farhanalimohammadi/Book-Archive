
"use client";

import { useEffect } from "react";

type ReadingPositionProps = {
  chapterSlug: string;
};

type SavedPosition = {
  version: 2;
  pageId: string;
  offset: number;
};

const STORAGE_PREFIX = "microservices-reader-position";
const READING_ANCHOR_RATIO = 0.35;

export function ReadingPosition({
  chapterSlug,
}: ReadingPositionProps) {
  useEffect(() => {
    const storageKey = `${STORAGE_PREFIX}:${chapterSlug}`;

    let animationFrameId = 0;
    let restoreFrameId = 0;
    let isRestoring = true;
    let isDisposed = false;

    function getPages() {
      return Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-reader-page-id]",
        ),
      );
    }

    function getAnchorPage() {
      const pages = getPages();

      if (pages.length === 0) {
        return null;
      }

      const anchorY =
        window.scrollY +
        window.innerHeight * READING_ANCHOR_RATIO;

      let closestPage = pages[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const page of pages) {
        const rect = page.getBoundingClientRect();
        const pageTop = rect.top + window.scrollY;
        const pageBottom = pageTop + rect.height;

        if (anchorY >= pageTop && anchorY <= pageBottom) {
          return {
            element: page,
            pageTop,
            anchorY,
          };
        }

        const distance = Math.min(
          Math.abs(anchorY - pageTop),
          Math.abs(anchorY - pageBottom),
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestPage = page;
        }
      }

      const rect = closestPage.getBoundingClientRect();

      return {
        element: closestPage,
        pageTop: rect.top + window.scrollY,
        anchorY,
      };
    }

    function savePosition() {
      if (isRestoring || isDisposed) {
        return;
      }

      const current = getAnchorPage();

      if (!current) {
        return;
      }

      const pageId = current.element.dataset.readerPageId;

      if (!pageId) {
        return;
      }

      const savedPosition: SavedPosition = {
        version: 2,
        pageId,
        offset: Math.max(
          0,
          current.anchorY - current.pageTop,
        ),
      };

      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify(savedPosition),
        );
      } catch {
        // Storage may be unavailable.
      }
    }

    function handleScroll() {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(savePosition);
    }

    function handlePageHide() {
      savePosition();
    }

    async function restorePosition() {
      try {
        await document.fonts.ready;
      } catch {
        // Continue even if font loading fails.
      }

      if (isDisposed) {
        return;
      }

      restoreFrameId = requestAnimationFrame(() => {
        restoreFrameId = requestAnimationFrame(() => {
          try {
            const storedValue = localStorage.getItem(storageKey);

            if (storedValue !== null) {
              let parsed: unknown;

              try {
                parsed = JSON.parse(storedValue);
              } catch {
                parsed = Number(storedValue);
              }

              if (
                typeof parsed === "object" &&
                parsed !== null &&
                "version" in parsed &&
                parsed.version === 2 &&
                "pageId" in parsed &&
                typeof parsed.pageId === "string" &&
                "offset" in parsed &&
                typeof parsed.offset === "number" &&
                Number.isFinite(parsed.offset) &&
                parsed.offset >= 0
              ) {
                const page = getPages().find(
                  (item) =>
                    item.dataset.readerPageId === parsed.pageId,
                );

                if (page) {
                  const pageTop =
                    page.getBoundingClientRect().top +
                    window.scrollY;

                  const targetY =
                    pageTop +
                    parsed.offset -
                    window.innerHeight * READING_ANCHOR_RATIO;

                  window.scrollTo({
                    top: Math.max(0, targetY),
                    behavior: "auto",
                  });
                }
              } else if (
                typeof parsed === "number" &&
                Number.isFinite(parsed) &&
                parsed >= 0
              ) {
                // Backward compatibility with the old scrollY format.
                window.scrollTo({
                  top: parsed,
                  behavior: "auto",
                });
              }
            }
          } catch {
            // Start reading from the current position.
          }

          isRestoring = false;

          window.addEventListener("scroll", handleScroll, {
            passive: true,
          });

          window.addEventListener("pagehide", handlePageHide);
        });
      });
    }

    void restorePosition();


  return () => {
    savePosition();

    isDisposed = true;

    cancelAnimationFrame(restoreFrameId);
    cancelAnimationFrame(animationFrameId);

    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("pagehide", handlePageHide);
  };

  }, [chapterSlug]);

  return null;
}
