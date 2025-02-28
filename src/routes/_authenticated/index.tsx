import { createFileRoute } from "@tanstack/react-router";

import AppLayout from "@/layouts/app-layout";
import PageComponent from "@/pages/home/page";

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <PageComponent />
    </AppLayout>
  );
}
