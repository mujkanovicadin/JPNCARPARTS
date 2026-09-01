import { describe, expect, it } from "vitest";
import { cartReducer, type CartItem } from "./cart-context";

const sampleItem: Omit<CartItem, "quantity"> = {
  productId: "p1",
  slug: "p1-slug",
  name: "Test Part",
  brand: "Test Brand",
  unitPriceMinorUnits: 1000,
  currency: "USD",
  image: "/part-placeholder.svg",
};

describe("cartReducer", () => {
  it("adds a new item", () => {
    const state = cartReducer(
      { items: [] },
      { type: "ADD_ITEM", item: sampleItem, quantity: 1 }
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ productId: "p1", quantity: 1 });
  });

  it("increments quantity when adding an existing item", () => {
    const initial = cartReducer(
      { items: [] },
      { type: "ADD_ITEM", item: sampleItem, quantity: 1 }
    );
    const state = cartReducer(initial, {
      type: "ADD_ITEM",
      item: sampleItem,
      quantity: 2,
    });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it("removes an item that reaches zero quantity via SET_QUANTITY", () => {
    const initial = cartReducer(
      { items: [] },
      { type: "ADD_ITEM", item: sampleItem, quantity: 1 }
    );
    const state = cartReducer(initial, {
      type: "SET_QUANTITY",
      productId: "p1",
      quantity: 0,
    });
    expect(state.items).toHaveLength(0);
  });

  it("clears all items", () => {
    const initial = cartReducer(
      { items: [] },
      { type: "ADD_ITEM", item: sampleItem, quantity: 1 }
    );
    const state = cartReducer(initial, { type: "CLEAR" });
    expect(state.items).toHaveLength(0);
  });
});
