import { describe, it } from "vitest";

import App from "../App";
import { render, screen } from "../utils/test-utils";

describe("App", () => {
  it("should renders a header saying 'Github User Search'", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Github User Search"
    );
  });
});
