import { Button } from "@/components/design/button";
import { MorphingText } from "@/components/design/morphing-text";
import { Link } from "@tanstack/react-router";

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

export default function PageComponent() {
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
    </div>
  );
}
