import { it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewForm } from "./ReviewForm";

vi.mock("../../utilities/firebase", () => ({
  useAuth: vi.fn(() => null),
  useDbUpdate: vi.fn(() => [vi.fn(), { loading: false, error: null }]),
  useDbData: vi.fn(() => [[], null]),
}));

test("When non user submits a review, the action is denied", async () => {
  render(<ReviewForm />);

  fireEvent.change(screen.getByLabelText(/Review/i), {
    target: { value: "Test review." },
  });

  fireEvent.click(screen.getByTestId("star-3"));

  fireEvent.click(screen.getByText(/Submit/i));

  
  expect(screen.getByText(/Log in required/i)).toBeInTheDocument();
});