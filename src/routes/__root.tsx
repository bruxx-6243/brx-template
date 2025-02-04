import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RootLayoutContext = {
  token: string | null;
};

export const Route = createRootRouteWithContext<RootLayoutContext>()({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
