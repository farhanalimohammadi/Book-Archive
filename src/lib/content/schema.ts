
import { z } from "zod";

/* ----------------------------------------
 * Common
 * -------------------------------------- */

export const idSchema = z
  .string()
  .trim()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "ID must contain lowercase letters, numbers and hyphens",
  );
export const slugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain lowercase letters, numbers and hyphens",
  );

/* ----------------------------------------
 * Inline content
 * -------------------------------------- */

const textSchema = z
  .object({
    type: z.literal("text"),
    value: z.string(),
    direction: z.enum(["auto", "rtl", "ltr"]).optional(),
    marks: z.array(z.enum(["bold", "italic"])).optional(),
  })
  .strict();

const termSchema = z
  .object({
    type: z.literal("term"),
    value: z.string().min(1),
    termId: idSchema,
  })
  .strict();

const linkSchema = z
  .object({
    type: z.literal("link"),
    label: z.string().min(1),
    target: z
      .object({
        chapterSlug: slugSchema,
        blockId: idSchema.optional(),
      })
      .strict(),
  })
  .strict();

const inlineCodeSchema = z
  .object({
    type: z.literal("inlineCode"),
    value: z.string(),
  })
  .strict();

export const inlineContentSchema = z.discriminatedUnion("type", [
  textSchema,
  termSchema,
  linkSchema,
  inlineCodeSchema,
]);

/* ----------------------------------------
 * Content blocks
 * -------------------------------------- */

const headingBlockSchema = z
  .object({
    id: idSchema,
    type: z.literal("heading"),
    level: z.union([
      z.literal(2),
      z.literal(3),
      z.literal(4),
    ]),
    text: z.string().min(1),
  })
  .strict();

const paragraphBlockSchema = z
  .object({
    id: idSchema,
    type: z.literal("paragraph"),
    content: z.array(inlineContentSchema).min(1),
  })
  .strict();

const imageBlockSchema = z
  .object({
    id: idSchema,
    type: z.literal("image"),
    src: z.string().min(1),
    alt: z.string().min(1),
    caption: z.string().optional(),
  })
  .strict();

const tableBlockSchema = z
  .object({
    id: idSchema,
    type: z.literal("table"),
    headers: z
      .array(z.array(inlineContentSchema).min(1))
      .min(1),
    rows: z.array(
      z.array(
        z.array(inlineContentSchema).min(1),
      ),
    ),
  })
  .strict()
  .superRefine((table, context) => {
    const columnCount = table.headers.length;

    table.rows.forEach((row, rowIndex) => {
      if (row.length !== columnCount) {
        context.addIssue({
          code: "custom",
          path: ["rows", rowIndex],
          message: `Expected ${columnCount} cells, received ${row.length}`,
        });
      }
    });
  });

const codeBlockSchema = z
  .object({
    id: idSchema,
    type: z.literal("code"),
    language: z.string().min(1),
    content: z.string(),
  })
  .strict();

const listBlockSchema = z
  .object({
    id: idSchema,
    type: z.literal("list"),
    ordered: z.boolean(),
    items: z
      .array(z.array(inlineContentSchema).min(1))
      .min(1),
  })
  .strict();

const quoteBlockSchema = z
  .object({
    id: idSchema,
    type: z.literal("quote"),
    content: z.array(inlineContentSchema).min(1),
  })
  .strict();

export const contentBlockSchema = z.discriminatedUnion("type", [
  headingBlockSchema,
  paragraphBlockSchema,
  imageBlockSchema,
  tableBlockSchema,
  codeBlockSchema,
  listBlockSchema,
  quoteBlockSchema,
]);

/* ----------------------------------------
 * Page
 * -------------------------------------- */

export const pageSchema = z
  .object({
    id: idSchema,
    number: z.number().int().positive(),
    blocks: z.array(contentBlockSchema),
  })
  .strict();

/* ----------------------------------------
 * Chapter
 * -------------------------------------- */

export const chapterSchema = z
  .object({
    id: idSchema,
    slug: slugSchema,
    number: z.number().int().positive(),
    title: z.string().min(1),
    description: z.string().optional(),
    pages: z.array(pageSchema).min(1),
  })
  .strict()
  .superRefine((chapter, context) => {
    const pageIds = new Set<string>();
    const pageNumbers = new Set<number>();
    const blockIds = new Set<string>();

    chapter.pages.forEach((page, pageIndex) => {
      if (pageIds.has(page.id)) {
        context.addIssue({
          code: "custom",
          path: ["pages", pageIndex, "id"],
          message: `Duplicate page ID: ${page.id}`,
        });
      }
      pageIds.add(page.id);

      if (pageNumbers.has(page.number)) {
        context.addIssue({
          code: "custom",
          path: ["pages", pageIndex, "number"],
          message: `Duplicate page number: ${page.number}`,
        });
      }
      pageNumbers.add(page.number);

      page.blocks.forEach((block, blockIndex) => {
        if (blockIds.has(block.id)) {
          context.addIssue({
            code: "custom",
            path: ["pages", pageIndex, "blocks", blockIndex, "id"],
            message: `Duplicate block ID: ${block.id}`,
          });
        }
        blockIds.add(block.id);
      });
    });
  });

/* ----------------------------------------
 * Book manifest
 * -------------------------------------- */

export const chapterSummarySchema = z
  .object({
    id: idSchema,
    slug: slugSchema,
    number: z.number().int().positive(),
    title: z.string().min(1),
  })
  .strict();

export const bookSchema = z
  .object({
    id: idSchema,
    title: z.string().min(1),
    originalTitle: z.string().min(1),
    author: z.string().min(1),
    description: z.string(),
    cover: z.string().min(1),
    chapters: z.array(chapterSummarySchema),
  })
  .strict()
  .superRefine((book, context) => {
    const ids = new Set<string>();
    const slugs = new Set<string>();
    const numbers = new Set<number>();

    book.chapters.forEach((chapter, index) => {
      if (ids.has(chapter.id)) {
        context.addIssue({
          code: "custom",
          path: ["chapters", index, "id"],
          message: `Duplicate chapter ID: ${chapter.id}`,
        });
      }
      ids.add(chapter.id);

      if (slugs.has(chapter.slug)) {
        context.addIssue({
          code: "custom",
          path: ["chapters", index, "slug"],
          message: `Duplicate chapter slug: ${chapter.slug}`,
        });
      }
      slugs.add(chapter.slug);

      if (numbers.has(chapter.number)) {
        context.addIssue({
          code: "custom",
          path: ["chapters", index, "number"],
          message: `Duplicate chapter number: ${chapter.number}`,
        });
      }
      numbers.add(chapter.number);
    });
  });

/* ----------------------------------------
 * Glossary
 * -------------------------------------- */

export const glossaryTermSchema = z
  .object({
    id: idSchema,
    term: z.string().min(1),
    translation: z.string().min(1),
    definition: z.string().min(1),
    relatedTerms: z.array(idSchema).optional(),
  })
  .strict();

/* ----------------------------------------
 * Inferred TypeScript types
 * -------------------------------------- */

export type InlineContent = z.infer<typeof inlineContentSchema>;
export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type BookPage = z.infer<typeof pageSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
export type ChapterSummary = z.infer<typeof chapterSummarySchema>;
export type Book = z.infer<typeof bookSchema>;
export type GlossaryTerm = z.infer<typeof glossaryTermSchema>;
