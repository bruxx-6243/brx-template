import { Button } from "@/components/design/button";
import { fireEvent, queryByAttribute, render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("Button test component", () => {
  const getById = queryByAttribute.bind(null, "id");

  const element = render(<Button />);
  const button = getById(element.container, "count");

  test("verify that the button is defined", () => {
    expect(button).toBeDefined();
  });

  test("Verify that the count increment", () => {
    if (button) {
      fireEvent.click(button);
      expect(button.textContent?.includes("1"));
    }
  });
});
