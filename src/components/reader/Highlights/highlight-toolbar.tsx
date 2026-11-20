
"use client";

import {
  Check,
  Highlighter,
} from "lucide-react";

import type { HighlightColor } from "@/lib/reader/highlights";
import { useHighlights } from "@/components/reader/Highlights/highlight-provider";

const COLOR_OPTIONS: {
  color: HighlightColor;
  label: string;
  className: string;
}[] = [
  {
    color: "yellow",
    label: "زرد",
    className: "bg-yellow-300",
  },
  {
    color: "green",
    label: "سبز",
    className: "bg-green-300",
  },
  {
    color: "blue",
    label: "آبی",
    className: "bg-blue-300",
  },
  {
    color: "pink",
    label: "صورتی",
    className: "bg-pink-300",
  },
];

export function HighlightToolbar() {
  const {
    selectedText,
    addHighlight,
  } = useHighlights();

  if (!selectedText) {
    return null;
  }

  return (
    <div
      data-reader-ui
      role="toolbar"
      aria-label="ابزار هایلایت متن انتخاب‌شده"
      className="fixed inset-x-3 bottom-5 z-[70] mx-auto flex w-fit max-w-[calc(100%-24px)] flex-wrap items-center justify-center gap-3 rounded-xl border border-border bg-background p-3 shadow-xl"
    >
      <span className="flex items-center gap-2 text-xs font-medium text-muted">
        <Highlighter size={16} aria-hidden="true" />
        رنگ هایلایت
      </span>

      <div className="flex items-center gap-2">
        {COLOR_OPTIONS.map((option) => (
          <button
            key={option.color}
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => addHighlight(option.color)}
            aria-label={`هایلایت با رنگ ${option.label}`}
            title={option.label}
            className={`flex size-8 items-center justify-center rounded-full border border-black/10 ${option.className} transition hover:scale-110`}
          >
            <Check
              size={16}
              className="text-gray-800"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
