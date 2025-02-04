import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-3 text-center">
        <h1 className="uppercase">App layout</h1>

        <div> {children}</div>
      </div>
    </div>
  );
}
