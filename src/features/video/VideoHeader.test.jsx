import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import VideoHeader from "./VideoHeader";
import { useAppDispatch } from "../../common/hooks";
import * as roiSlice from "../roi/roiSlice";
import * as fascicleSlice from "../fascicle/fascicleSlice";
import * as videoSlice from "./videoSlice";
import { render } from "../../common/testUtils";

vi.mock("../../common/hooks", () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock("../roi/roiSlice", () => ({
  clearSampleRois: vi.fn(),
  clearComputedRois: vi.fn(),
}));
vi.mock("../fascicle/fascicleSlice", () => ({
  clearSampleFascicleLengths: vi.fn(),
  clearComputedFascicleLengths: vi.fn(),
}));
vi.mock("./videoSlice", () => ({
  removeVideo: vi.fn(),
}));

describe("VideoHeader Component", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  it("renders with the video name", () => {
    const name = "Sample Video";
    render(<VideoHeader name={name} />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it("dispatches all actions when the remove button is clicked", () => {
    render(<VideoHeader name="Sample Video" />);
    fireEvent.click(screen.getByRole("button"));

    expect(mockDispatch).toHaveBeenCalledWith(roiSlice.clearSampleRois());
    expect(mockDispatch).toHaveBeenCalledWith(roiSlice.clearComputedRois());
    expect(mockDispatch).toHaveBeenCalledWith(
      fascicleSlice.clearSampleFascicleLengths()
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      fascicleSlice.clearComputedFascicleLengths()
    );
    expect(mockDispatch).toHaveBeenCalledWith(videoSlice.removeVideo());
  });
});
