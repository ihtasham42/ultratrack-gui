import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import VideoFooter from "./VideoFooter";
import { render } from "../../common/testUtils";

vi.mock("./VideoControls", () => ({
  __esModule: true,
  default: vi.fn(() => <div>VideoControls</div>),
}));

vi.mock("./VideoSlider", () => ({
  __esModule: true,
  default: vi.fn(() => <div>VideoSlider</div>),
}));

describe("VideoFooter", () => {
  it("renders VideoSlider and VideoControls components", () => {
    render(<VideoFooter />);
    expect(screen.getByText("VideoSlider")).toBeInTheDocument();
    expect(screen.getByText("VideoControls")).toBeInTheDocument();
  });
});
