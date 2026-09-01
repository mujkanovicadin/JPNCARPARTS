import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the hero heading and a link to the catalog", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        name: /japanese automotive parts, delivered internationally/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse parts/i })).toBeInTheDocument();
  });
});
