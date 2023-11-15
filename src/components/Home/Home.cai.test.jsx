import { render, screen, expect, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { it, describe } from "vitest";

describe("map modal test", () => {
  it("shows modal when map button is clicked", () => {
    // Render the component
    render(<Home />);

    // Find the button that triggers the modal
    const mapButton = screen.getByRole("map-button");

    // Trigger a click event on the button
    fireEvent.click(mapButton);
  });
});
