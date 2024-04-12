import { screen } from "@testing-library/react";
import StatisticsContainer from "./StatisticsContainer";
import { describe, it, expect, vi } from "vitest";
import { render } from "../../common/testUtils";

vi.mock("./Chart", () => ({
  default: vi.fn(() => <div>Mock Chart</div>),
}));

describe("StatisticsContainer", () => {
  it("renders without crashing", () => {
    render(<StatisticsContainer />);

    expect(screen.getByText("Fascicle Length Over Time")).toBeInTheDocument();
  });
});
