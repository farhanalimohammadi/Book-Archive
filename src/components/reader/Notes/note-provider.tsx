
"use client";

import {
  useRef,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  type Note,
  type Notes,
} from "@/lib/reader/notes";

import {
  getNoteStorageKey,
  loadNotes,
  saveNotes,
} from "@/lib/reader/note-storage";

type CreateNoteInput = {
  chapterSlug: string;
  blockId: string;
  title: string;
  content: string;
};

type UpdateNoteInput = {
  title: string;
  content: string;
};

type NoteContextValue = {
  notes: Notes;
  isLoaded: boolean;

  addNote: (input: CreateNoteInput) => boolean;

  updateNote: (
    id: string,
    input: UpdateNoteInput,
  ) => boolean;

  removeNote: (id: string) => void;

  getNotesForBlock: (
    chapterSlug: string,
    blockId: string,
  ) => Note[];
};

const NoteContext =
  createContext<NoteContextValue | null>(null);

type NoteProviderProps = {
  children: ReactNode;
};

const MAX_NOTES = 500;

export function NoteProvider({
  children,
}: NoteProviderProps) {
  const [notes, setNotes] = useState<Notes>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const skipNextSave = useRef(false);

  // Load notes from localStorage.
  useEffect(() => {
    let isCancelled = false;

    const frameId = window.requestAnimationFrame(() => {
      const storedNotes = loadNotes();

      if (!isCancelled) {
        setNotes(storedNotes);
        setIsLoaded(true);
      }
    });

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  // Persist notes after initial loading.
    useEffect(() => {
    if (!isLoaded) {
        return;
    }

    if (skipNextSave.current) {
        skipNextSave.current = false;
        return;
    }

    saveNotes(notes);
    }, [notes, isLoaded]);

  // Synchronize notes between browser tabs.
    useEffect(() => {
    function handleStorage(event: StorageEvent) {
        if (
        event.key !== getNoteStorageKey() &&
        event.key !== null
        ) {
        return;
        }

        skipNextSave.current = true;
        setNotes(loadNotes());
    }

    window.addEventListener("storage", handleStorage);

    return () => {
        window.removeEventListener("storage", handleStorage);
    };
    }, []);

  const addNote = useCallback(
    (input: CreateNoteInput): boolean => {
      const chapterSlug = input.chapterSlug.trim();
      const blockId = input.blockId.trim();
      const title = input.title.trim();
      const content = input.content.trim();

      if (
        !chapterSlug ||
        !blockId ||
        !title ||
        !content ||
        title.length > 120 ||
        content.length > 20000
      ) {
        return false;
      }

      const now = Date.now();

      if (notes.length >= MAX_NOTES) {
        return false;
    }

      const newNote: Note = {
        id: crypto.randomUUID(),
        chapterSlug,
        blockId,
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };

      setNotes((current) => {
        if (current.length >= MAX_NOTES) {
          return current;
        }

        return [...current, newNote];
      });

      return true;
    },
    [notes.length],
  );

  const updateNote = useCallback(
    (
      id: string,
      input: UpdateNoteInput,
    ): boolean => {
      const title = input.title.trim();
      const content = input.content.trim();

      if (
        !id ||
        !title ||
        !content ||
        title.length > 120 ||
        content.length > 20000
      ) {
        return false;
      }

      if (!notes.some((note) => note.id === id)) {
        return false;
      }

      setNotes((current) =>
        current.map((note) =>
          note.id === id
            ? {
                ...note,
                title,
                content,
                updatedAt: Math.max(
                  Date.now(),
                  note.createdAt,
                ),
              }
            : note,
        ),
      );

      return true;
    },
    [notes],
  );

  const removeNote = useCallback((id: string) => {
    setNotes((current) =>
      current.filter((note) => note.id !== id),
    );
  }, []);

  const getNotesForBlock = useCallback(
    (chapterSlug: string, blockId: string) =>
      notes.filter(
        (note) =>
          note.chapterSlug === chapterSlug &&
          note.blockId === blockId,
      ),
    [notes],
  );

  return (
    <NoteContext.Provider
      value={{
        notes,
        isLoaded,
        addNote,
        updateNote,
        removeNote,
        getNotesForBlock,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error(
      "useNotes must be used within NoteProvider",
    );
  }

  return context;
}
