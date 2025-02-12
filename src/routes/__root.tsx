import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

/**
 * Defines the context type for the root layout.
 *
 * @typedef {Object} RootLayoutContext
 * @property {string | null} token - The authentication token, if available.
 */
type RootLayoutContext = {
  token: string | null;
};

/**
 * Creates the root route with a custom context.
 *
 * - Provides a shared layout and context for all routes.
 * - Uses a token in the context to manage authentication state.
 */
export const Route = createRootRouteWithContext<RootLayoutContext>()({
  component: RootComponent,
});

/**
 * The root component for the application's routing.
 *
 * - Acts as a container for child routes.
 * - Renders nested routes via `<Outlet />`.
 *
 * @returns {JSX.Element} The root layout component.
 */
function RootComponent() {
  return <Outlet />;
}
