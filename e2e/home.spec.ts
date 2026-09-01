import { test, expect } from "@playwright/test";

test("home page loads and shows the platform heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /japanese automotive parts platform/i })
  ).toBeVisible();
});
