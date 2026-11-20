
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Bookmark, Bookmarks } from "@/lib/reader/bookmarks";
import {
  getBookmarkStorageKey,
  loadBookmarks,
  saveBookmarks,
} from "@/lib/storage/bookmark-storage";

type BookmarkContextValue = {
  bookmarks: Bookmarks;
  isLoaded: boolean;
    addBookmark: (
    chapterSlug: string,
    blockId: string,
    title: string,
    ) => void;
  removeBookmark: (id: string) => void;
  updateBookmarkTitle: (id: string, title: string) => void;
  isBookmarked: (chapterSlug: string, blockId: string) => boolean;
  getBookmark: (
    chapterSlug: string,
    blockId: string,
  ) => Bookmark | undefined;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(
  null,
);

type BookmarkProviderProps = {
  children: ReactNode;
};

export function BookmarkProvider({
  children,
}: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmarks>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const frameId = window.requestAnimationFrame(() => {
      const storedBookmarks = loadBookmarks();

      if (!isCancelled) {
        setBookmarks(storedBookmarks);
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

    saveBookmarks(bookmarks);
  }, [bookmarks, isLoaded]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (
        event.key !== getBookmarkStorageKey() &&
        event.key !== null
      ) {
        return;
      }

      setBookmarks(loadBookmarks());
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

    const addBookmark = useCallback(
    (
        chapterSlug: string,
        blockId: string,
        title: string,
    ): void => {
        const normalizedTitle = title.trim();

        if (
        !chapterSlug.trim() ||
        !blockId.trim() ||
        !normalizedTitle
        ) {
        return;
        }

        const newBookmark: Bookmark = {
        id: crypto.randomUUID(),
        chapterSlug,
        blockId,
        title: normalizedTitle.slice(0, 120),
        createdAt: Date.now(),
        };

        setBookmarks((current) => {
        const alreadyExists = current.some(
            (bookmark) =>
            bookmark.chapterSlug === chapterSlug &&
            bookmark.blockId === blockId,
        );

        if (alreadyExists || current.length >= 500) {
            return current;
        }

        return [...current, newBookmark];
        });
    },
    [],
    );

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((current) =>
      current.filter((bookmark) => bookmark.id !== id),
    );
  }, []);

  const updateBookmarkTitle = useCallback(
    (id: string, title: string) => {
      const normalizedTitle = title.trim();

      if (!normalizedTitle) {
        return;
      }

      setBookmarks((current) =>
        current.map((bookmark) =>
          bookmark.id === id
            ? {
                ...bookmark,
                title: normalizedTitle.slice(0, 120),
              }
            : bookmark,
        ),
      );
    },
    [],
  );

  const isBookmarked = useCallback(
    (chapterSlug: string, blockId: string) =>
      bookmarks.some(
        (bookmark) =>
          bookmark.chapterSlug === chapterSlug &&
          bookmark.blockId === blockId,
      ),
    [bookmarks],
  );

  const getBookmark = useCallback(
    (chapterSlug: string, blockId: string) =>
      bookmarks.find(
        (bookmark) =>
          bookmark.chapterSlug === chapterSlug &&
          bookmark.blockId === blockId,
      ),
    [bookmarks],
  );

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoaded,
        addBookmark,
        removeBookmark,
        updateBookmarkTitle,
        isBookmarked,
        getBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);

  if (!context) {
    throw new Error(
      "useBookmarks must be used within BookmarkProvider",
    );
  }

  return context;
}
