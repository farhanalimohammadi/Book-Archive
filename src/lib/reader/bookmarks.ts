
import { z } from "zod";

export const bookmarkSchema = z
  .object({
    id: z.string().min(1),
    chapterSlug: z.string().min(1),
    blockId: z.string().min(1),
    title: z.string().trim().min(1).max(120),
    createdAt: z.number().int().positive(),
  })
  .strict();

export const bookmarksSchema = z
  .array(bookmarkSchema)
  .max(500);

export type Bookmark = z.infer<typeof bookmarkSchema>;

export type Bookmarks = z.infer<typeof bookmarksSchema>;
