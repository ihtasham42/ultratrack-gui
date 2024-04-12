import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { useAppSelector } from "../../common/hooks";
import VideoContainer from "./VideoContainer";
import { render } from "../../common/testUtils";

vi.mock("../../common/hooks", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("./UploadRegion", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Upload Region</div>),
}));

vi.mock("./VideoDisplay", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Video Display</div>),
}));

describe("VideoContainer", () => {
  it("renders UploadRegion when there is no video source", () => {
    vi.mocked(useAppSelector).mockReturnValue({ source: null });

    render(<VideoContainer />);
    expect(screen.getByText("Upload Region")).toBeInTheDocument();
  });

  it("renders VideoDisplay when video source is available", () => {
    vi.mocked(useAppSelector).mockReturnValue({ source: "video.mp4" });

    render(<VideoContainer />);
    expect(screen.getByText("Video Display")).toBeInTheDocument();
  });
});
