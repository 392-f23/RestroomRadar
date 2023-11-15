// Home.test.js
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";

// Mock the firebase utilities or any other external dependencies
jest.mock("../../utilities/firebase", () => ({
  useDbData: jest.fn(() => [[], null]),
}));

jest.mock("../../utilities/googleApiCalls", () => ({
  getCurrLocation: jest.fn(),
  getAddressFromLocation: jest.fn(),
  getCoordinateLocation: jest.fn(),
  getNearbyRestrooms: jest.fn(),
}));

describe("Home component", () => {
  it("renders without crashing", () => {
    render(<Home />);
    // You can add more specific assertions based on your component's rendering
    expect(
      screen.getByText("Loading closest restrooms...")
    ).toBeInTheDocument();
  });

  it("opens the map modal when the map button is clicked", () => {
    render(<Home />);
    const mapButton = screen.getByLabelText("Open Map");
    userEvent.click(mapButton);
    expect(screen.getByText("Map Content")).toBeInTheDocument(); // Adjust this based on your modal content
  });

  // Add more test cases as needed for different functionalities of the component
});
