import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import ManagerContainer from "./ManagerContainer";
import {
  clearComputedFascicleLengths,
  clearSampleFascicleLengths,
} from "../fascicle/fascicleSlice";
import { clearComputedRois, clearSampleRois } from "../roi/roiSlice";
import { render } from "../../common/testUtils";

vi.mock("../../common/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe("ManagerContainer", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
  });

  it("renders buttons and triggers compute video action", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      manager: { loading: false, error: null },
    });

    render(<ManagerContainer />);

    const computeButton = screen.getByText("Compute Video");
    expect(computeButton).toBeInTheDocument();
    fireEvent.click(computeButton);

    expect(dispatchMock).toHaveBeenCalledOnce();
  });

  it("renders buttons and triggers clear data actions", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      manager: { loading: false, error: null },
    });

    render(<ManagerContainer />);

    const clearButton = screen.getByText("Clear Data");
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(dispatchMock).toHaveBeenCalledTimes(4);
    expect(dispatchMock).toHaveBeenCalledWith(clearSampleFascicleLengths());
    expect(dispatchMock).toHaveBeenCalledWith(clearComputedFascicleLengths());
    expect(dispatchMock).toHaveBeenCalledWith(clearSampleRois());
    expect(dispatchMock).toHaveBeenCalledWith(clearComputedRois());
  });

  it("shows an alert when there is an error", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      loading: false,
      error: true,
    });

    render(<ManagerContainer />);

    screen.debug();

    const alert = screen.getByTestId("error-alert");
    expect(alert).toBeInTheDocument();
  });

  it("displays loading state correctly", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      loading: true,
      error: null,
    });

    render(<ManagerContainer />);

    const computeButton = screen.getByTestId("compute-video-button");
    const clearButton = screen.getByTestId("clear-data-button");

    expect(computeButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });
});
