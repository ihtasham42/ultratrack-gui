import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { useAppSelector } from "../../common/hooks";
import Chart from "./Chart";
import { getFlattenedRenderObjects } from "../renderCommon/renderUtils";
import { render } from "../../common/testUtils";

vi.mock("../../common/hooks", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("./NoDataChart", () => ({
  __esModule: true,
  default: vi.fn(() => <div>No Data Available</div>),
}));

vi.mock("echarts-for-react", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Chart</div>),
}));

vi.mock("./statisticsService", () => ({
  computeChartOptions: vi.fn(() => ({
    series: [{ data: [1, 2, 3] }],
    yAxis: {},
  })),
  getDistanceBetweenPoints: vi.fn(() => 50),
}));

vi.mock("../video/videoUtils", () => ({
  fromTimeToFrame: vi.fn(() => 5),
}));

vi.mock("../renderCommon/renderUtils", () => ({
  getFlattenedRenderObjects: vi.fn(() => []),
}));

describe("Chart Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders NoDataChart when there are no computed lengths", () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      return selector({
        fascicle: {
          computedFascicleLengths: [],
          sampleFascicleLengths: [],
        },
        video: {
          metadata: { currentTime: 10, duration: 100 },
        },
      });
    });

    render(<Chart />);
    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });

  it("renders ReactECharts when computed lengths are available", () => {
    vi.mocked(getFlattenedRenderObjects).mockReturnValue([
      { sampleId: "id1", point1: { x: 0, y: 0 }, point2: { x: 1, y: 1 } },
    ]);

    vi.mocked(useAppSelector).mockImplementation((selector) => {
      return selector({
        fascicle: {
          computedFascicleLengths: [{}],
          sampleFascicleLengths: [{}],
        },
        video: {
          metadata: { currentTime: 10, duration: 100 },
        },
      });
    });

    render(<Chart />);
    expect(screen.getByText("Chart")).toBeInTheDocument();
  });

  it("does not render anything if metadata is not available", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      fascicle: {
        computedFascicleLengths: [{}],
        sampleFascicleLengths: [{}],
      },
      video: { metadata: undefined },
    });

    render(<Chart />);
    const chart = screen.queryByTestId("chart");
    expect(chart).toBeNull();
  });
});
