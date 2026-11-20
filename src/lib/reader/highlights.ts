
import { z } from "zod";

export const highlightColorSchema = z.enum([
  "yellow",
  "green",
  "blue",
  "pink",
]);

export const highlightSchema = z
  .object({
    id: z.string().min(1),
    chapterSlug: z.string().min(1),
    blockId: z.string().min(1),
    text: z.string().min(1).max(10000),
    startOffset: z.number().int().nonnegative(),
    endOffset: z.number().int().positive(),
    color: highlightColorSchema,
    createdAt: z.number().int().positive(),
  })
  .strict()
  .refine(
    (highlight) => highlight.endOffset > highlight.startOffset,
    {
      message: "End offset must be greater than start offset",
      path: ["endOffset"],
    },
  );

export const highlightsSchema = z
  .array(highlightSchema)
  .max(1000);

export type HighlightColor = z.infer<
  typeof highlightColorSchema
>;

export type Highlight = z.infer<typeof highlightSchema>;

export type Highlights = z.infer<typeof highlightsSchema>;
