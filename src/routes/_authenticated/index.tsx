import { createFileRoute } from "@tanstack/react-router";

import AppLayout from "@/components/layouts/app-layout";
import PageComponent from "@/components/pages/home/page";

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
