import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "../../common/testUtils";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import VideoSlider from "./VideoSlider";
import { VideoPlaybackState } from "./videoModels";
import { screen } from "@testing-library/react";

const DEFAULT_METADATA = {
  duration: 120,
  currentTime: 5,
  playbackState: VideoPlaybackState.PAUSED,
  name: "video.mp4",
};

vi.mock("../../common/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

let dispatchMock;

beforeEach(() => {
  dispatchMock = vi.fn();
  vi.mocked(useAppDispatch).mockImplementation(() => dispatchMock);
});

describe("VideoSlider", () => {
  it("renders correctly", () => {
    vi.mocked(useAppSelector).mockImplementation(() => ({
      metadata: { ...DEFAULT_METADATA },
    }));

    render(<VideoSlider />);

    expect(screen.getByTestId("video-slider")).toBeInTheDocument();
  });

  it("should not render when metadata is undefined", () => {
    vi.mocked(useAppSelector).mockImplementation(() => ({
      metadata: undefined,
    }));

    render(<VideoSlider />);

    const slider = screen.queryByTestId("video-slider");

    expect(slider).not.toBeInTheDocument();
  });
});
