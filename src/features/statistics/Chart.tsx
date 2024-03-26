import { Box } from "@mantine/core";
import { computeChartOptions } from "./statisticsService";
import { useAppSelector } from "../../common/hooks";
import ReactECharts from "echarts-for-react";
import { fromTimeToFrame } from "../video/videoUtils";
import NoDataChart from "./NoDataChart";
import { getFlattenedRenderObjects } from "../renderCommon/renderUtils";

const Chart = () => {
  const { computedFascicleLengths, sampleFascicleLengths } = useAppSelector(
    (state) => state.fascicle
  );

  const { metadata } = useAppSelector((state) => state.video);

  if (!metadata) {
    return;
  }

  const { currentTime, duration } = metadata;

  const sampleIds = getFlattenedRenderObjects(sampleFascicleLengths).map(
    ({ sampleId }) => sampleId
  );

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
    <Box h={300}>
      {sampleIds.length !== 0 ? (
        <ReactECharts notMerge option={chartOptions} style={{ height: 300 }} />
      ) : (
        <NoDataChart />
      )}
    </Box>
  );
};

export default Chart;
