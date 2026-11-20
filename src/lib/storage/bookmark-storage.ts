
import {
  bookmarksSchema,
  type Bookmarks,
} from "@/lib/reader/bookmarks";

const STORAGE_KEY = "microservices-reader-bookmarks";

export function loadBookmarks(): Bookmarks {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsed: unknown = JSON.parse(storedValue);
    const result = bookmarksSchema.safeParse(parsed);

    if (!result.success) {
      return [];
    }

    return result.data;
  } catch {
    return [];
  }
}

export function saveBookmarks(bookmarks: Bookmarks): boolean {
  try {
    const result = bookmarksSchema.safeParse(bookmarks);

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

export function getBookmarkStorageKey(): string {
  return STORAGE_KEY;
}
