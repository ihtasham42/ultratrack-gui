import { describe, it, expect, vi } from "vitest";
import CanvasDisplay from "./CanvasDisplay";
import { useAppSelector } from "../../common/hooks";
import { render } from "../../common/testUtils";

vi.mock("../../common/hooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe("CanvasDisplay Component", () => {
  it("renders correctly based on provided video metadata and marks", () => {
    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector({
        fascicle: {
          computedFascicleLengths: {},
          sampleFascicleLengths: {},
        },
        roi: {
          computedRois: {},
          sampleRois: {},
        },
        video: {
          metadata: {
            currentTime: 100,
            playbackState: "PAUSED",
            duration: 3600,
          },
          mark: {
            mode: "FASCICLE_LENGTH",
            points: [
              { x: 50, y: 50 },
              { x: 150, y: 150 },
            ],
          },
        },
      })
    );

    const { container } = render(<CanvasDisplay />);

    // Verify that the canvas elements are rendered
    expect(container.querySelectorAll("canvas")).toHaveLength(2);

    // Optionally check for some styles or other attributes that depend on the useSelector data
    const canvasElements = container.getElementsByTagName("canvas");
    expect(canvasElements[0]).toHaveStyle({
      position: "absolute",
      zIndex: "1",
    });
    expect(canvasElements[1]).toHaveStyle({
      position: "absolute",
      zIndex: "2",
    });
  });
});
