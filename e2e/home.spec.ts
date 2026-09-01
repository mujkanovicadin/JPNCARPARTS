import { test, expect } from "@playwright/test";

test("home page loads and shows the platform heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /japanese automotive parts, delivered internationally/i })
  ).toBeVisible();
});

test("golden path: browse catalog, view a product, add it to the cart", async ({
  page,
}) => {
  await page.goto("/parts");
  await expect(page.getByRole("heading", { name: "Parts" })).toBeVisible();

  await page.getByRole("link", { name: /HKS Super SQV4/i }).click();
  await expect(
    page.getByRole("heading", { name: /HKS Super SQV4/i })
  ).toBeVisible();

  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("link", { name: /Cart \(1\)/ })).toBeVisible();

  await page.getByRole("link", { name: /Cart \(1\)/ }).click();
  await expect(page.getByText(/HKS Super SQV4/i)).toBeVisible();
});
