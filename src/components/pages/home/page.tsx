import { Button } from "@/components/design/button";
import { Route } from "@/routes/_authenticated/index";

export default function PageComponent() {
  const { token } = Route.useRouteContext();

  return (
    <div className="text-center">
      <code className="mb-3 inline-block">token - {token}</code>
      <Button />
    </div>
  );
}
