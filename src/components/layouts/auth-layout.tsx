import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-3 text-center">
        <h1 className="uppercase">Auth layout</h1>

        <div> {children}</div>
      </div>
    </div>
  );
}
