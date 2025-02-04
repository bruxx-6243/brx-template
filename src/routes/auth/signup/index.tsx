import AuthLayout from "@/components/layouts/auth-layout";
import PageComponent from "@/components/pages/auth/signup/page";
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
