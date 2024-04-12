import { screen } from "@testing-library/react";
import SampleFascicleContainer from "./SampleFascicleContainer";
import { describe, it, expect, vi } from "vitest";
import { render } from "../../common/testUtils";

vi.mock("./SampleFascicleAddButton", () => ({
  default: vi.fn(() => <button>Mock Add Button</button>),
}));

vi.mock("./SampleFascicleTable", () => ({
  default: vi.fn(() => <button>Mock Table</button>),
}));

describe("SampleFascicleContainer", () => {
  it("renders without crashing", () => {
    render(<SampleFascicleContainer />);

    expect(screen.getByText("Sample Fascicle Lengths")).toBeInTheDocument();
  });
});
