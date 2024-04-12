import { screen } from "@testing-library/react";
import NoDataChart from "./NoDataChart";
import { describe, it, expect } from "vitest";
import { render } from "../../common/testUtils";

describe("NoDataChart", () => {
  it("renders without crashing", () => {
    render(<NoDataChart />);

    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });
});
