
import { readFile } from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

import {
  bookSchema,
  chapterSchema,
  slugSchema,
  type Book,
  type Chapter,
  type ChapterSummary,
} from "@/lib/content/schema";

/* ----------------------------------------
 * Paths
 * -------------------------------------- */

const CONTENT_DIRECTORY = path.join(
  process.cwd(),
  "src",
  "content",
);

const CHAPTERS_DIRECTORY = path.join(
  CONTENT_DIRECTORY,
  "chapters",
);

const BOOK_FILE = path.join(
  CONTENT_DIRECTORY,
  "book.json",
);

/* ----------------------------------------
 * Content errors
 * -------------------------------------- */

export class ContentLoadError extends Error {
  constructor(
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ContentLoadError";
  }
}

export class ContentValidationError extends Error {
  constructor(
    source: string,
    details: string[],
  ) {
    super(
      `Invalid content in "${source}":\n${details.join("\n")}`,
    );

    this.name = "ContentValidationError";
  }
}

/* ----------------------------------------
 * Internal helpers
 * -------------------------------------- */

async function readJsonFile(
  filePath: string,
): Promise<unknown> {
  let fileContent: string;

  try {
    fileContent = await readFile(filePath, "utf-8");
  } catch (error) {
    throw new ContentLoadError(
      `Unable to read content file: ${filePath}`,
      { cause: error },
    );
  }

  try {
    return JSON.parse(fileContent) as unknown;
  } catch (error) {
    throw new ContentLoadError(
      `Invalid JSON syntax in file: ${filePath}`,
      { cause: error },
    );
  }
}

function validateContent<T>(
  schema: z.ZodType<T>,
  data: unknown,
  source: string,
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const details = result.error.issues.map((issue) => {
      const fieldPath =
        issue.path.length > 0
          ? issue.path.join(".")
          : "root";

      return `${fieldPath}: ${issue.message}`;
    });

    throw new ContentValidationError(
      source,
      details,
    );
  }

  return result.data;
}

function assertChapterMatchesManifest(
  chapter: Chapter,
  summary: ChapterSummary,
): void {
  const mismatches: string[] = [];

  if (chapter.id !== summary.id) {
    mismatches.push("Chapter ID does not match the book manifest.");
  }

  if (chapter.slug !== summary.slug) {
    mismatches.push("Chapter slug does not match the book manifest.");
  }

  if (chapter.number !== summary.number) {
    mismatches.push("Chapter number does not match the book manifest.");
  }

  if (chapter.title !== summary.title) {
    mismatches.push("Chapter title does not match the book manifest.");
  }

  if (mismatches.length > 0) {
    throw new ContentValidationError(
      `chapter "${summary.slug}"`,
      mismatches,
    );
  }
}

/* ----------------------------------------
 * Public API
 * -------------------------------------- */

export async function getBookManifest(): Promise<Book> {
  const data = await readJsonFile(BOOK_FILE);

  return validateContent(
    bookSchema,
    data,
    "book.json",
  );
}

export async function getChapterBySlug(
  slug: string,
): Promise<Chapter | null> {
  const validatedSlug = slugSchema.safeParse(slug);

  if (!validatedSlug.success) {
    return null;
  }

  const book = await getBookManifest();

  const summary = book.chapters.find(
    (chapter) => chapter.slug === validatedSlug.data,
  );

  if (!summary) {
    return null;
  }

  const chapterFile = path.join(
    CHAPTERS_DIRECTORY,
    `${summary.id}.json`,
  );

  const data = await readJsonFile(chapterFile);

  const chapter = validateContent(
    chapterSchema,
    data,
    `${summary.id}.json`,
  );

  assertChapterMatchesManifest(
    chapter,
    summary,
  );

  return chapter;
}

export async function getAllChapters(): Promise<Chapter[]> {
  const book = await getBookManifest();

  const chapters = await Promise.all(
    book.chapters.map(async (summary) => {
      const chapter = await getChapterBySlug(summary.slug);

      if (!chapter) {
        throw new ContentLoadError(
          `Chapter "${summary.slug}" is listed in book.json but could not be loaded.`,
        );
      }

      return chapter;
    }),
  );

  return chapters;
}
