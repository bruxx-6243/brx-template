import { createFileRoute } from "@tanstack/react-router";

import useSEO from "@/hooks/useSEO";
import AppLayout from "@/layouts/app-layout";
import PageComponent from "@/pages/home/page";

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  useSEO({
    title: "Home",
    description: "Welcome to the home page",
  });

  return (
    <AppLayout>
      <PageComponent />
    </AppLayout>
  );
}
