import { Route } from "@/routes/_authenticated/index";

export default function PageComponent() {
  const { token } = Route.useRouteContext();

  return (
    <div>
      <code className="text-sm">token: {token}</code>;
    </div>
  );
}
