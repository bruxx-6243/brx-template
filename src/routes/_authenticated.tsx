import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Defines the authenticated route layout.
 *
 * - This route serves as a parent layout for authenticated pages.
 * - Uses `<Outlet />` to render child routes inside it.
 */
export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
});

/**
 * The layout component for authenticated routes.
 *
 * @returns {JSX.Element} The component rendering nested routes via `<Outlet />`.
 */
function RouteComponent() {
  return <Outlet />;
}
