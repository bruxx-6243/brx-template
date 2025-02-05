import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-rows-[50px_1fr]">
      <div className="flex items-center justify-between border-b border-neutral-200 py-4">
        <code className="font-semibold text-neutral-900">BrxTemplate</code>
        <a
          href="https://github.com/bruxx-6243"
          className="text-blue-600 underline"
        >
          bruxx-6243
        </a>
      </div>

      <div className="flex h-full items-center justify-center">{children}</div>
    </div>
  );
}
