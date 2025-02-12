import { RouterProvider } from "@tanstack/react-router";

import { getAuthToken } from "@/lib/utils";
import { router } from "@/router";

/**
 * Extends the `@tanstack/react-router` module to register the application's router.
 */
declare module "@tanstack/react-router" {
  interface Register {
    /** The registered router instance used in the application. */
    router: typeof router;
  }
}

/**
 * The main application component that provides routing.
 *
 * - Retrieves the authentication token.
 * - Passes the token as part of the router context.
 *
 * @returns {JSX.Element} The application wrapped in a `RouterProvider`.
 */
export function App() {
  const token = getAuthToken();

  return <RouterProvider router={router} context={{ token }} />;
}
