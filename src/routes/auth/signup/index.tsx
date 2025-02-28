import AuthLayout from "@/layouts/auth-layout";
import PageComponent from "@/pages/auth/signup/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout>
      <PageComponent />
    </AuthLayout>
  );
}
