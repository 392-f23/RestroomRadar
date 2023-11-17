import { it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewForm } from "./ReviewForm";

vi.mock("../../utilities/firebase", () => ({
  useAuth: vi.fn(() => [{ uid: "testUserId" }]),
  useDbUpdate: vi.fn(() => [vi.fn(), { loading: false, error: null }]),
  useDbData: vi.fn(() => [[], null]),
}));

test("submitting a review adds it to the restroom review list", async () => {
  render(<ReviewForm />);

  fireEvent.change(screen.getByLabelText(/Review/i), {
    target: { value: "This is a test review." },
  });

  fireEvent.click(screen.getByTestId("star-3"));

  fireEvent.click(screen.getByText(/Submit/i));

  expect(showFormMock).toHaveBeenCalled();
  expect(screen.getByText(/You submitted a review!/i)).toBeInTheDocument();
});
