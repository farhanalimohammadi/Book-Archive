
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Highlighter,
  Trash2,
} from "lucide-react";

import { useHighlights } from "@/components/reader/Highlights/highlight-provider";

import type { HighlightColor } from "@/lib/reader/highlights";

type HighlightPanelProps = {
  chapterSlug: string;
};

const COLOR_LABELS: Record<HighlightColor, string> = {
  yellow: "زرد",
  green: "سبز",
  blue: "آبی",
  pink: "صورتی",
};

const COLOR_CLASSES: Record<HighlightColor, string> = {
  yellow: "bg-yellow-300",
  green: "bg-green-300",
  blue: "bg-blue-300",
  pink: "bg-pink-300",
};

export function HighlightPanel({
  chapterSlug,
}: HighlightPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    highlights,
    isLoaded,
    removeHighlight,
  } = useHighlights();

  const chapterHighlights = highlights
    .filter((item) => item.chapterSlug === chapterSlug)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <section className="mb-6 overflow-hidden rounded-xl border border-border bg-surface">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="chapter-highlights"
        className="flex w-full items-center justify-between gap-3 p-4 text-start transition hover:bg-surface-secondary"
      >
        <span className="flex items-center gap-2">
          <Highlighter size={18} aria-hidden="true" />

          <span className="font-semibold">
            هایلایت‌های این فصل
          </span>

          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            {chapterHighlights.length}
          </span>
        </span>

        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="chapter-highlights"
          className="border-t border-border p-4"
        >
          {!isLoaded ? (
            <p className="text-sm text-muted">
              در حال بارگذاری هایلایت‌ها...
            </p>
          ) : chapterHighlights.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted">
              هنوز متنی را هایلایت نکرده‌ای.
            </p>
          ) : (
            <ul className="space-y-3">
              {chapterHighlights.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <span
                    className={`mt-1 size-3 shrink-0 rounded-full ${COLOR_CLASSES[item.color]}`}
                    title={`رنگ ${COLOR_LABELS[item.color]}`}
                  />

                  <Link
                    href={`/chapters/${item.chapterSlug}#bookmark-${item.blockId}`}
                    className="min-w-0 flex-1 text-sm leading-7 transition hover:text-primary"
                  >
                    <span className="line-clamp-3">
                      {item.text}
                    </span>

                    <span className="mt-1 block text-xs text-muted">
                      {COLOR_LABELS[item.color]}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeHighlight(item.id)}
                    aria-label="حذف هایلایت"
                    title="حذف هایلایت"
                    className="rounded-md p-2 text-muted transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
