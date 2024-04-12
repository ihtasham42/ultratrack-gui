import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import VideoDisplay from "./VideoDisplay";
import { useAppSelector, useAppDispatch } from "../../common/hooks";
import { render } from "../../common/testUtils";

vi.mock("../../common/hooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock("./VideoHeader", () => ({
  __esModule: true,
  default: vi.fn(() => <div>VideoHeader</div>),
}));

vi.mock("./CanvasDisplay", () => ({
  __esModule: true,
  default: vi.fn(() => <div>CanvasDisplay</div>),
}));

vi.mock("./VideoFooter", () => ({
  __esModule: true,
  default: vi.fn(() => <div>VideoFooter</div>),
}));

describe("VideoDisplay Component", () => {
  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(vi.fn());
  });

  it("does not render video player when source or metadata is not available", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      video: {
        source: null,
        metadata: null,
      },
    });
    render(<VideoDisplay />);
    expect(
      screen.queryByText("Your browser does not support the video tag.")
    ).toBeNull();
  });

  it("renders video player and child components when source and metadata are available", () => {
    const mockDispatch = vi.fn();
    vi.mocked(useAppSelector).mockReturnValue({
      source: "video.mp4",
      metadata: {
        name: "Test Video",
        currentTime: 0,
        playbackState: "PAUSED",
      },
    });
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);

    const { container } = render(<VideoDisplay />);
    expect(screen.getByText("VideoHeader")).toBeInTheDocument();
    expect(container.querySelector("video")).toBeInTheDocument();
    expect(screen.getByText("CanvasDisplay")).toBeInTheDocument();
    expect(screen.getByText("VideoFooter")).toBeInTheDocument();
  });
});
