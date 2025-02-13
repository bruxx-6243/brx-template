import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      {children}
    </div>
  );
}
