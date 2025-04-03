import type { PropsWithChildren } from "react";

export default function AppLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
