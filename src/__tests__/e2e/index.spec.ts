import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has BrxTemplate", async ({ page }) => {
  await expect(page.locator("code")).toContainText("BrxTemplate");
});

test("button increments count on click", async ({ page }) => {
  const countButton = page.getByRole("button", { name: /count - \d+/i });

  await expect(countButton).toHaveText("count - 0");

  await countButton.click();

  await expect(countButton).toHaveText("count - 1");

  await countButton.click();
  await expect(countButton).toHaveText("count - 2");
});
