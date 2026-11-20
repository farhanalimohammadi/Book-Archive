
import { z } from "zod";

export const noteSchema = z
  .object({
    id: z.string().min(1),
    chapterSlug: z.string().min(1),
    blockId: z.string().min(1),

    title: z
      .string()
      .trim()
      .min(1)
      .max(120),

    content: z
      .string()
      .trim()
      .min(1)
      .max(20000),

    createdAt: z.number().int().positive(),
    updatedAt: z.number().int().positive(),
  })
  .strict()
  .refine(
    (note) => note.updatedAt >= note.createdAt,
    {
      message: "Updated date cannot be earlier than creation date",
      path: ["updatedAt"],
    },
  );

export const notesSchema = z
  .array(noteSchema)
  .max(500);

export type Note = z.infer<typeof noteSchema>;

export type Notes = z.infer<typeof notesSchema>;
