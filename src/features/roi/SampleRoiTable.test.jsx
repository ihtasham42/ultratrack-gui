import { fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "../../common/testUtils";
import SampleRoiTable from "./SampleRoiTable";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { getFlattenedRenderObjects } from "../renderCommon/renderUtils";
import { removeSampleRoi, setFixedRoi, setVisibleRoi } from "./roiSlice";

vi.mock("../../common/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("../../common/components/SampleColorBadge", () => ({
  default: vi.fn(() => <button>Mock Sample Color Badge</button>),
}));

vi.mock("../renderCommon/renderUtils", () => ({
  getFlattenedRenderObjects: vi.fn(),
}));

describe("SampleRoiTable", () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = vi.fn();
    vi.mocked(useAppSelector).mockReturnValue({});
    vi.mocked(useAppDispatch).mockImplementation(() => dispatchMock);
  });

  it("renders no rows if there are no ROIs", () => {
    vi.mocked(getFlattenedRenderObjects).mockReturnValue([]);

    render(<SampleRoiTable />);

    const rows = screen.queryAllByRole("row");

    expect(rows).toHaveLength(1);
  });

  it("renders the correct number of rows according to the number of ROIs", () => {
    vi.mocked(getFlattenedRenderObjects).mockReturnValue([
      { sampleId: "1", frameNumber: 1, fixed: false, visible: true },
      { sampleId: "2", frameNumber: 1, fixed: false, visible: true },
      { sampleId: "3", frameNumber: 1, fixed: false, visible: true },
    ]);

    render(<SampleRoiTable />);

    const rows = screen.queryAllByRole("row");

    expect(rows).toHaveLength(4);
  });

  it("renders the correct information within a row", () => {
    vi.mocked(useAppDispatch).mockImplementation(() => vi.fn());
    vi.mocked(getFlattenedRenderObjects).mockReturnValue([
      { sampleId: "1", frameNumber: 3, fixed: false, visible: true },
    ]);

    const { rerender } = render(<SampleRoiTable />);

    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.getByRole("checkbox")).not.toBeChecked();

    let button = screen.getByTestId("visible-button");

    const previousStyle = window.getComputedStyle(button);

    vi.mocked(getFlattenedRenderObjects).mockReturnValue([
      { sampleId: "1", frameNumber: 3, fixed: false, visible: false },
    ]);

    rerender(<SampleRoiTable />);

    button = screen.getByTestId("visible-button");

    const newStyle = window.getComputedStyle(button);

    expect(newStyle).not.toStrictEqual(previousStyle);
  });

  it("dispatches the correct action when the checkbox is checked", () => {
    vi.mocked(getFlattenedRenderObjects).mockReturnValue([
      { sampleId: "1", frameNumber: 3, fixed: false, visible: true },
    ]);

    render(<SampleRoiTable />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    const payload = {
      newValue: true,
      sampleId: "1",
      frameNumber: 3,
    };

    expect(dispatchMock).toHaveBeenCalledOnce();
    expect(dispatchMock).toBeCalledWith(setFixedRoi(payload));
  });

  it("dispatches the correct action when the visibility button is clicked", () => {
    vi.mocked(getFlattenedRenderObjects).mockReturnValue([
      { sampleId: "1", frameNumber: 3, fixed: false, visible: true },
    ]);

    render(<SampleRoiTable />);

    const button = screen.getByTestId("visible-button");

    fireEvent.click(button);

    const payload = {
      newValue: false,
      sampleId: "1",
      frameNumber: 3,
    };

    expect(dispatchMock).toHaveBeenCalledOnce();
    expect(dispatchMock).toBeCalledWith(setVisibleRoi(payload));
  });

  it("dispatches the correct action when the remove button is clicked", () => {
    vi.mocked(getFlattenedRenderObjects).mockReturnValue([
      { sampleId: "1", frameNumber: 3, fixed: false, visible: true },
    ]);

    render(<SampleRoiTable />);

    const button = screen.getByTestId("remove-button");

    fireEvent.click(button);

    const payload = {
      sampleId: "1",
    };

    expect(dispatchMock).toHaveBeenCalledOnce();
    expect(dispatchMock).toBeCalledWith(removeSampleRoi(payload));
  });
});
