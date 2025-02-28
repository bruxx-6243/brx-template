import AppLayout from "@/layouts/app-layout";
import PageComponent from "@/pages/posts/page";
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
