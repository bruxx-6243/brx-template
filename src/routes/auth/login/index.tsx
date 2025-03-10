import { createFileRoute, redirect } from "@tanstack/react-router";

import AuthLayout from "@/layouts/auth-layout";
import PageComponent from "@/pages/auth/login/page";

export const Route = createFileRoute("/auth/login/")({
  beforeLoad({ context }) {
    if (context.token) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <PageComponent />
    </AuthLayout>
  );
}
