import { Box } from "@mantine/core";
import {
  computeChartOptions,
  getDistanceBetweenPoints,
} from "./statisticsService";
import { useAppSelector } from "../../common/hooks";
import ReactECharts from "echarts-for-react";
import { fromTimeToFrame } from "../video/videoUtils";
import NoDataChart from "./NoDataChart";
import { getFlattenedRenderObjects } from "../renderCommon/renderUtils";
import { useMemo } from "react";
import { FascicleLengthWithFrameNumber } from "../fascicle/fascicleModels";

const Chart = () => {
  const { computedFascicleLengths, sampleFascicleLengths } = useAppSelector(
    (state) => state.fascicle
  );

  const computedLengths = useMemo(
    () => getFlattenedRenderObjects(computedFascicleLengths),
    [computedFascicleLengths]
  );

  const { metadata } = useAppSelector((state) => state.video);

  if (!metadata) {
    return;
  }

  const { currentTime, duration } = metadata;

  const flattenedSampleLengths = getFlattenedRenderObjects(
    sampleFascicleLengths
  ) as FascicleLengthWithFrameNumber[];

  const flattenedComputedLengths = getFlattenedRenderObjects(
    computedFascicleLengths
  ) as FascicleLengthWithFrameNumber[];

  const sampleIds = flattenedSampleLengths.map(({ sampleId }) => sampleId);

  const shortestDistance = flattenedComputedLengths.reduce(
    (acc, { point1, point2 }) =>
      Math.min(getDistanceBetweenPoints(point1, point2), acc),
    Number.MAX_VALUE
  );

  const chartMinimumY = Math.max(Math.floor(shortestDistance - 30), 0);

  const chartOptions = computeChartOptions(
    computedFascicleLengths,
    sampleIds,
    duration
  );

  if (chartOptions.series.length > 0) {
    const currentFrame = fromTimeToFrame(currentTime);

    chartOptions.series[0].markLine = {
      silent: true,
      animation: false,
      data: [
        {
          xAxis: currentFrame,
          label: {
            show: true,
            formatter: `Frame ${currentFrame}`,
          },
        },
      ],
      lineStyle: {
        color: "black",
        type: "solid",
      },
    };

    chartOptions.yAxis = {
      type: "value",
      min: chartMinimumY,
    };
  }

  return (
    <Box h={300} data-testid="chart">
      {computedLengths.length > 0 ? (
        <ReactECharts notMerge option={chartOptions} style={{ height: 300 }} />
      ) : (
        <NoDataChart />
      )}
    </Box>
  );
};

export default Chart;
