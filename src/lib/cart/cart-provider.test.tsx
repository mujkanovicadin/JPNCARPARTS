import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CartProvider, useCart, type CartItem } from "./cart-context";

const STORAGE_KEY = "jpn-parts-cart";

const savedItem: CartItem = {
  productId: "p1",
  slug: "p1-slug",
  name: "Saved Part",
  brand: "Brand",
  unitPriceMinorUnits: 1000,
  currency: "USD",
  image: "/part-placeholder.svg",
  quantity: 2,
};

function Reader() {
  const { items } = useCart();
  return <div data-testid="count">{items.length}</div>;
}

describe("CartProvider hydration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("does not wipe a previously saved cart on mount", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([savedItem]));

    render(
      <CartProvider>
        <Reader />
      </CartProvider>
    );

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")).toHaveLength(1);
    });
  });
});
