import { createFileRoute } from "@tanstack/react-router";

import AuthLayout from "@/components/layouts/auth-layout";
import PageComponent from "@/components/pages/auth/login/page";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <PageComponent />
    </AuthLayout>
  );
}
