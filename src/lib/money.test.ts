import { describe, expect, it } from "vitest";
import { formatMoney, sumMinorUnits } from "./money";

describe("formatMoney", () => {
  it("formats integer minor units as currency", () => {
    expect(formatMoney(129900, "USD")).toBe("$1,299.00");
  });

  it("handles zero", () => {
    expect(formatMoney(0, "USD")).toBe("$0.00");
  });
});

describe("sumMinorUnits", () => {
  it("sums a list of integer amounts", () => {
    expect(sumMinorUnits([100, 200, 300])).toBe(600);
  });

  it("returns 0 for an empty list", () => {
    expect(sumMinorUnits([])).toBe(0);
  });
});
