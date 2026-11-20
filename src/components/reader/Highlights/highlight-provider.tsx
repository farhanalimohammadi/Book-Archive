
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  Highlight as ReaderHighlight,
  HighlightColor,
  Highlights,
} from "@/lib/reader/highlights";

import {
  getHighlightStorageKey,
  loadHighlights,
  saveHighlights,
} from "@/lib/storage/highlight-storage";

import {
  createHighlightRange,
  getSelectionData,
} from "@/lib/utils/highlight-utils";

type SelectionData = {
  chapterSlug: string;
  blockId: string;
  text: string;
  startOffset: number;
  endOffset: number;
};

type HighlightContextValue = {
  highlights: Highlights;
  isLoaded: boolean;
  selectedText: SelectionData | null;
  addHighlight: (color: HighlightColor) => void;
  removeHighlight: (id: string) => void;
};

const HighlightContext =
  createContext<HighlightContextValue | null>(null);

type HighlightProviderProps = {
  children: ReactNode;
  chapterSlug: string;
};

const COLORS: HighlightColor[] = [
  "yellow",
  "green",
  "blue",
  "pink",
];

const CSS_HIGHLIGHT_PREFIX = "reader-highlight-";

export function HighlightProvider({
  children,
  chapterSlug,
}: HighlightProviderProps) {
  const [highlights, setHighlights] = useState<Highlights>([]);
  const [selectedText, setSelectedText] =
    useState<SelectionData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const frameId = window.requestAnimationFrame(() => {
      const storedHighlights = loadHighlights();

      if (!isCancelled) {
        setHighlights(storedHighlights);
        setIsLoaded(true);
      }
    });

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    saveHighlights(highlights);
  }, [highlights, isLoaded]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (
        event.key !== getHighlightStorageKey() &&
        event.key !== null
      ) {
        return;
      }

      setHighlights(loadHighlights());
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    function updateSelection() {
      cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const selection = getSelectionData();

        if (
          selection &&
          selection.chapterSlug === chapterSlug
        ) {
          setSelectedText(selection);
        } else {
          setSelectedText(null);
        }
      });
    }

    document.addEventListener("selectionchange", updateSelection);
    document.addEventListener("mouseup", updateSelection);
    document.addEventListener("keyup", updateSelection);

    return () => {
      cancelAnimationFrame(frameId);

      document.removeEventListener(
        "selectionchange",
        updateSelection,
      );

      document.removeEventListener("mouseup", updateSelection);
      document.removeEventListener("keyup", updateSelection);
    };
  }, [chapterSlug]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (
      typeof CSS === "undefined" ||
      !("highlights" in CSS) ||
      typeof Highlight === "undefined"
    ) {
      return;
    }

    const registry = CSS.highlights;

    for (const color of COLORS) {
      registry.delete(`${CSS_HIGHLIGHT_PREFIX}${color}`);
    }

    const groupedRanges = new Map<HighlightColor, Range[]>();

    for (const color of COLORS) {
      groupedRanges.set(color, []);
    }

    const chapterHighlights = highlights.filter(
      (item) => item.chapterSlug === chapterSlug,
    );

    for (const item of chapterHighlights) {
      const root = document.querySelector<HTMLElement>(
        `[data-highlight-block][data-chapter-slug="${CSS.escape(item.chapterSlug)}"][data-block-id="${CSS.escape(item.blockId)}"]`,
      );

      if (!root) {
        continue;
      }

      const range = createHighlightRange(root, item);

      if (range) {
        groupedRanges.get(item.color)?.push(range);
      }
    }

    for (const color of COLORS) {
      const ranges = groupedRanges.get(color) ?? [];

      if (ranges.length > 0) {
        registry.set(
          `${CSS_HIGHLIGHT_PREFIX}${color}`,
          new Highlight(...ranges),
        );
      }
    }

    return () => {
      for (const color of COLORS) {
        registry.delete(`${CSS_HIGHLIGHT_PREFIX}${color}`);
      }
    };
  }, [highlights, isLoaded, chapterSlug]);

  const addHighlight = useCallback(
    (color: HighlightColor) => {
      if (!selectedText) {
        return;
      }

      const newHighlight: ReaderHighlight =  {
        id: crypto.randomUUID(),
        chapterSlug: selectedText.chapterSlug,
        blockId: selectedText.blockId,
        text: selectedText.text,
        startOffset: selectedText.startOffset,
        endOffset: selectedText.endOffset,
        color,
        createdAt: Date.now(),
      };

      setHighlights((current) => {
        if (current.length >= 1000) {
          return current;
        }

        const alreadyExists = current.some(
          (item) =>
            item.chapterSlug === newHighlight.chapterSlug &&
            item.blockId === newHighlight.blockId &&
            item.startOffset === newHighlight.startOffset &&
            item.endOffset === newHighlight.endOffset,
        );

        if (alreadyExists) {
          return current;
        }

        return [...current, newHighlight];
      });

      setSelectedText(null);
      window.getSelection()?.removeAllRanges();
    },
    [selectedText],
  );

  const removeHighlight = useCallback((id: string) => {
    setHighlights((current) =>
      current.filter((item) => item.id !== id),
    );
  }, []);

  return (
    <HighlightContext.Provider
      value={{
        highlights,
        isLoaded,
        selectedText,
        addHighlight,
        removeHighlight,
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
}

export function useHighlights() {
  const context = useContext(HighlightContext);

  if (!context) {
    throw new Error(
      "useHighlights must be used within HighlightProvider",
    );
  }

  return context;
}
