import { z } from "zod";

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const PostsArraySchema = z.array(PostSchema);
export type Posts = z.infer<typeof PostsArraySchema>;
