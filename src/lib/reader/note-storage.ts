
import {
  notesSchema,
  type Notes,
} from "@/lib/reader/notes";

const STORAGE_KEY = "microservices-reader-notes";

export function loadNotes(): Notes {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsed: unknown = JSON.parse(storedValue);
    const result = notesSchema.safeParse(parsed);

    if (!result.success) {
      return [];
    }

    return result.data;
  } catch {
    return [];
  }
}

export function saveNotes(notes: Notes): boolean {
  try {
    const result = notesSchema.safeParse(notes);

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

export function getNoteStorageKey(): string {
  return STORAGE_KEY;
}
