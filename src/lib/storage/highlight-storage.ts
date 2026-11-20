
import {
  highlightsSchema,
  type Highlights,
} from "@/lib/reader/highlights";

const STORAGE_KEY = "microservices-reader-highlights";

export function loadHighlights(): Highlights {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsed: unknown = JSON.parse(storedValue);
    const result = highlightsSchema.safeParse(parsed);

    if (!result.success) {
      return [];
    }

    return result.data;
  } catch {
    return [];
  }
}

export function saveHighlights(
  highlights: Highlights,
): boolean {
  try {
    const result = highlightsSchema.safeParse(highlights);

    if (!result.success) {
      return false;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(result.data),
    );

    return true;
  } catch {
    return false;
  }
}

export function getHighlightStorageKey(): string {
  return STORAGE_KEY;
}
