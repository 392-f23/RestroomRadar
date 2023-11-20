import React from "react";
import { render, screen, fireEvent, beforeEach } from "@testing-library/react";
import Home from "./Home";
import { expect } from "vitest";
import { useDbData } from "../../utilities/firebase";

vi.mock("../../utilities/firebase", () => ({
    useDbData: vi.fn(() => [[], null]),
}));

vi.mock("../../utilities/googleApiCalls", () => ({
    getCurrLocation: vi.fn(),
    getAddressFromLocation: vi.fn(),
    getCoordinateLocation: vi.fn(),
    getNearbyRestrooms: vi.fn(),
}));

beforeEach(() => {
    const setState = vi.fn();
    const useStateSpy = vi.spyOn(React, "useState");
    useStateSpy.mockImplementation((initialState) => [initialState, setState]);
});

describe("a populated map opens when you click the icon", () => {
  it("loads the page successfully", () => {
    render(<Home />);
    screen.getByText("RestroomRadar");
    screen.getByText("Bathrooms Near Me");
  });

  it("returns populated map", async () => {
    render(<Home />);
    // Trigger click event
    fireEvent.click(screen.getByRole("map-button"));

    // Check updated content
    screen.getByRole("map");
  });
});