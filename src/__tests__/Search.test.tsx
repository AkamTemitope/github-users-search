import { describe, it } from "vitest";

import Search from "../components/Search";
import { render, screen, fireEvent } from "../utils/test-utils";

describe("Search", () => {
  it("should change input value when a value is entered", () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText(
      "Enter a name..."
    ) as HTMLInputElement;

    expect(searchInput.value).toBe("");
    fireEvent.change(searchInput, { target: { value: "Albert" } });
    expect(searchInput.value).toBe("Albert");
  });
});
