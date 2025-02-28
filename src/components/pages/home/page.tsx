import { Button } from "@/components/design/button";
import { MorphingText } from "@/components/design/morphing-text";
import { createMutationMethod } from "@/lib/api/method";
import { Link } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { z } from "zod";

const stack = [
  "React",
  "Vite",
  "TanStack",
  "TypeScript",
  "TailwindCSS",
  "Vitest",
  "Docker",
  "Husky",
  "Commitlint",
];

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export default function PageComponent() {
  const createUserMutation = createMutationMethod({
    key: "create-user",
    schema: userSchema,
    fn: async (variables: { id: number; name: string }) => {
      await new Promise((r) => setTimeout(r, 2000));

      return { id: variables.id, name: variables.name };
    },
    options: {
      onSuccess: ({ name }) => {
        toast(`Hello ${name} was created`, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  }).useHook();

  const { mutate, isPending } = createUserMutation;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <MorphingText texts={stack} className="text-white" />
      <Button />

      <div className="text-neutral-200">
        start editing <code>src/components/pages/home/page.tsx</code> to see
        changes
      </div>

      <Link to="/posts" className="text-white underline">
        Posts
      </Link>

      <button
        className="cursor-pointer text-white underline"
        onClick={() => mutate({ id: 1, name: "Fariol" })}
      >
        {isPending ? "Loading..." : "Create new user"}
      </button>
    </div>
  );
}
