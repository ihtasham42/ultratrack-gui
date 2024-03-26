import {
  FascicleLengthFrame,
  FascicleLengthFrames,
  FascicleLengthPoint,
} from "../fascicle/fascicleModels";
import { getRenderColor } from "../renderCommon/renderUtils";
import { fromTimeToFrame } from "../video/videoUtils";
import { baseChartOptions } from "./statisticsModels";

export const computeChartOptions = (
  frames: FascicleLengthFrames,
  sampleIds: string[],
  duration: number
) => {
  const series = toFascicleLengthChartData(frames, sampleIds);
  const legend = { data: sampleIds };
  const maxFrame = fromTimeToFrame(duration);

  return {
    ...baseChartOptions,
    xAxis: {
      type: "category",
      max: maxFrame,
    },
    yAxis: {
      type: "value",
    },
    legend,
    series,
  };
};

export const toFascicleLengthChartData = (
  frames: FascicleLengthFrames,
  sampleIds: string[]
): object[] => {
  return sampleIds.map((sampleId) => {
    const data = Object.values(frames).map((frame) => {
      const fascicleLength = frame.find(
        (length) => length.sampleId === sampleId
      );

      if (!fascicleLength) return 0;

      const { point1, point2 } = fascicleLength;

      return getDistanceBetweenPoints(point1, point2);
    });

    return {
      name: sampleId,
      type: "line",
      data,
      color: getRenderColor(sampleId),
    };
  });
};

export const getChartSeries = (frame: FascicleLengthFrame) => {
  return frame.map(({ sampleId }) => ({
    name: sampleId,
    color: getRenderColor(sampleId),
  }));
};

export const getDistanceBetweenPoints = (
  point1: FascicleLengthPoint,
  point2: FascicleLengthPoint
) => {
  return (
    Math.round(
      Math.sqrt(
        Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
      ) * 1000
    ) / 1000
  );
};
