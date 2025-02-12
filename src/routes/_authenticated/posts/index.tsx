import AppLayout from "@/components/layouts/app-layout";
import PageComponent from "@/components/pages/posts/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <PageComponent />
    </AppLayout>
  );
}
