import { beforeEach, describe, expect, it, vi } from "vitest";
import "../../common/hooks";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { MarkMode } from "../video/videoModels";
import { fireEvent, screen } from "@testing-library/react";
import SampleRoiAddButton from "./SampleRoiAddButton";
import { setMarkMode } from "../video/videoSlice";
import { render } from "../../common/testUtils";

vi.mock("../../common/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("../renderCommon/CancelMarkButton", () => ({
  default: vi.fn(() => <button>Mock Cancel Button</button>),
}));

describe("SampleRoiAddButton", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
  });

  it("renders the New button when mode is not ROI and dispatches correct action on click", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      mark: { mode: MarkMode.DISABLED },
    });

    render(<SampleRoiAddButton />);

    const newButton = screen.getByText("+ New");
    expect(newButton).toBeInTheDocument();

    fireEvent.click(newButton);

    expect(dispatchMock).toHaveBeenCalledWith(
      setMarkMode({ mode: MarkMode.ROI })
    );
  });

  it("renders the Cancel button when mode is ROI", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      mark: { mode: MarkMode.ROI },
    });

    render(<SampleRoiAddButton />);

    const cancelButton = screen.getByRole("button");
    expect(cancelButton).toBeInTheDocument();
  });
});
