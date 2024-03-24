import { Box } from "@mantine/core";
import { computeChartOptions } from "./statisticsService";
import { useAppSelector } from "../../common/hooks";
import ReactECharts from "echarts-for-react";
import { fromTimeToFrame } from "../video/videoUtils";
import { getFlattenedSampleFascicleLengths } from "../fascicle/fascicleUtils";

const Chart = () => {
  const { computedFascicleLengths, sampleFascicleLengths } = useAppSelector(
    (state) => state.fascicle
  );

  const { metadata } = useAppSelector((state) => state.video);

  if (!metadata) {
    return;
  }

  const { currentTime, duration } = metadata;

  const sampleIds = getFlattenedSampleFascicleLengths(
    sampleFascicleLengths
  ).map(({ sampleId }) => sampleId);

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
  }

  return (
    <Box>
      <ReactECharts option={chartOptions} style={{ height: 400 }} />
    </Box>
  );
};

export default Chart;
