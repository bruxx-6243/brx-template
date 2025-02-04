import { RouterProvider } from "@tanstack/react-router";

import { router } from "@/router";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const token = "051a3953-8bfa-4db2-8f5e-a2d29a150f8f";

  return <RouterProvider router={router} context={{ token }} />;
}
