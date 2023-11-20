import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from '../../App';
import { expect } from "vitest";

describe("signing in as guest takes you home", () => {
  it("loads the page successfully", () => {
    render(<App />);
    screen.getByText("RestroomRadar");
    screen.getByText("Continue as Guest");
  });

  it("clicks 'Continue as Guest' and updates content", async () => {
    render(<App />);
    // Trigger click event
    fireEvent.click(screen.getByText("Continue as Guest"));

    // Check updated content
    await expect(screen.getByText("Continue as Guest")).not.toBeInDocument();
    await screen.findByText("Sign in");
    await screen.findByText("Bathrooms Near Me");
  });
});