import { describe, it, expect, vi } from "vitest";
import {
  computeChartOptions,
  toFascicleLengthChartData,
  getDistanceBetweenPoints,
} from "./statisticsService";

// Mocking necessary utilities
vi.mock("../renderCommon/renderUtils", () => ({
  getRenderColor: vi.fn((id) => `color-${id}`),
}));

vi.mock("../video/videoUtils", () => ({
  fromTimeToFrame: vi.fn((time) => Math.floor(time / 30)),
}));

describe("statistics computations", () => {
  it("calculates the distance between two points accurately", () => {
    const point1 = { x: 0, y: 0 };
    const point2 = { x: 3, y: 4 };
    expect(getDistanceBetweenPoints(point1, point2)).toBe(5.0);
  });

  it("transforms fascicle length frames to chart data series", () => {
    const frames = {
      1: [
        { sampleId: "sample1", point1: { x: 0, y: 0 }, point2: { x: 3, y: 4 } },
        { sampleId: "sample2", point1: { x: 0, y: 0 }, point2: { x: 6, y: 8 } },
      ],
      2: [
        { sampleId: "sample1", point1: { x: 0, y: 0 }, point2: { x: 4, y: 3 } },
      ],
    };
    const sampleIds = ["sample1", "sample2"];
    const chartData = toFascicleLengthChartData(frames, sampleIds);

    expect(chartData).toHaveLength(2);
    expect(chartData[0]).toEqual({
      name: "sample1",
      type: "line",
      data: [5.0, 5.0],
      color: "color-sample1",
    });
    expect(chartData[1]).toEqual({
      name: "sample2",
      type: "line",
      data: [10.0, 0],
      color: "color-sample2",
    });
  });

  it("computes chart options with base configurations and dynamic series data", () => {
    const frames = {
      1: [
        { sampleId: "sample1", point1: { x: 0, y: 0 }, point2: { x: 1, y: 1 } },
      ],
    };
    const sampleIds = ["sample1"];
    const duration = 180; // assuming frame rate of 30 fps for easy computation

    const options = computeChartOptions(frames, sampleIds, duration);

    expect(options.xAxis.max).toBe(6); // fromTimeToFrame(180) = 6
    expect(options.series[0].data).toHaveLength(1);
    expect(options.legend.data).toEqual(["sample1"]);
  });
});
