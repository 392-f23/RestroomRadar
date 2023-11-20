import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, it, expect, vi } from 'vitest'
// import App from "./App";
import App from '../../App';

// Mocking the useAuth hook
vi.mock("./utilities/firebase", () => ({
  useAuth: vi.fn(() => [null, false]), // You might need to adjust this based on your actual useAuth implementation
}));

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    // Ensure that the component renders without throwing an error
  });

  it("displays the banner title when the user is authenticated", () => {
    const mockUser = {
      uid: "testUserId",
      photoURL: "testPhotoUrl",
      displayName: "Test User",
    };

    // Mocking the useAuth hook to return a user
    vi.mock("./utilities/firebase", () => ({
      useAuth: vi.fn(() => [mockUser, false]),
    }));

    render(<App />);
    
    // Replace 'RestroomRadar' with the actual expected title based on your logic
    expect(screen.getByText("RestroomRadar")).toBeInTheDocument();
  });

  it("displays the banner title when the guest user is set", () => {
    const continueAsGuest = vi.fn();

    render(<App />);

    fireEvent.click(screen.getByText("Continue as Guest"));

    // Replace 'RestroomRadar' with the actual expected title based on your logic
    expect(screen.getByText("RestroomRadar")).toBeInTheDocument();
  });

  it("displays the Signin component when the user is not authenticated", () => {
    // Mocking the useAuth hook to return no user
    vi.mock("./utilities/firebase", () => ({
      useAuth: vi.fn(() => [null, false]),
    }));

    render(<App />);
    
    // Ensure that the Signin component is rendered
    expect(screen.getByTestId("signin-component")).toBeInTheDocument();
  });
});