import { Button } from "@/components/design/button";
import { Route } from "@/routes/_authenticated/index";
import { useState } from "react";

export default function PageComponent() {
  const { token } = Route.useRouteContext();
  const [state, setState] = useState();

  return (
    <div>
      <Button />
      <code className="text-sm">token: {token}</code>;
    </div>
  );
}
