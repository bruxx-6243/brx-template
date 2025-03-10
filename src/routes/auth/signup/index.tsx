import useSEO from "@/hooks/useSEO";
import AuthLayout from "@/layouts/auth-layout";
import PageComponent from "@/pages/auth/signup/page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup/")({
  beforeLoad({ context }) {
    if (context.token) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  useSEO({
    title: "Signup",
    description: "Welcome to the signup page",
  });

  return (
    <AuthLayout>
      <PageComponent />
    </AuthLayout>
  );
}
