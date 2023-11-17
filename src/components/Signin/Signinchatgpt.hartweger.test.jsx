import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from '../../App';

describe("App Component", () => {
  it("renders the initial page with 'RestroomRadar'", () => {
    render(<App />);
    expect(screen.getByText("RestroomRadar")).toBeInTheDocument();
  });

  it("renders 'Continue as Guest' text", () => {
    render(<App />);
    expect(screen.getByText("Continue as Guest")).toBeInTheDocument();
  });

  it("clicks 'Continue as Guest' and updates content", () => {
    render(<App />);

    // Check initial content
    expect(screen.getByText("RestroomRadar")).toBeInTheDocument();
    expect(screen.getByText("Continue as Guest")).toBeInTheDocument();

    // Trigger click event
    fireEvent.click(screen.getByText("Continue as Guest"));

    // Check updated content
    expect(screen.getByText("RestroomRadar")).toBeInTheDocument();
    expect(screen.queryByText("Continue as Guest")).not.toBeInTheDocument();
  });
});