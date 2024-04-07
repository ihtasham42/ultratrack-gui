import { screen } from "@testing-library/react";
import SampleRoiContainer from "./SampleRoiContainer";
import { describe, it, expect, vi } from "vitest";
import { render } from "../../common/testUtils";

vi.mock("./SampleRoiAddButton", () => ({
  default: vi.fn(() => <button>Mock Add Button</button>),
}));

vi.mock("./SampleRoiTable", () => ({
  default: vi.fn(() => <button>Mock Table</button>),
}));

describe("SampleRoiContainer", () => {
  it("renders without crashing", () => {
    render(<SampleRoiContainer />);

    expect(screen.getByText("Sample ROIs")).toBeInTheDocument();
  });
});
