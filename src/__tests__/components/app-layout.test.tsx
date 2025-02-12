import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import AppLayout from "@/components/layouts/app-layout";

describe("Verify that the layout is correctly rendered", () => {
  test("verify that the login page is defined", () => {
    const appLayout = render(<AppLayout />);
    expect(appLayout).toBeDefined();
  });
});
