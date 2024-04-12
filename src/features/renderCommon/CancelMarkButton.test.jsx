import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import CancelMarkButton from "./CancelMarkButton";
import { useAppDispatch } from "../../common/hooks";
import { setMarkMode } from "../video/videoSlice";
import { MarkMode } from "../video/videoModels";
import { render } from "../../common/testUtils";

vi.mock("../../common/hooks", () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock("../video/videoSlice", () => ({
  setMarkMode: vi.fn(),
}));

describe("CancelMarkButton", () => {
  it("renders the button correctly", () => {
    render(<CancelMarkButton />);
    const button = screen.getByTestId("cancel-mark-button");
    expect(button).toBeInTheDocument();
  });

  it("dispatches setMarkMode action with DISABLED mode when clicked", () => {
    const mockDispatch = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    render(<CancelMarkButton />);

    const button = screen.getByRole("button", { name: /x Cancel/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(
      setMarkMode({ mode: MarkMode.DISABLED })
    );
    expect(setMarkMode).toHaveBeenCalledWith({ mode: MarkMode.DISABLED });
  });
});
