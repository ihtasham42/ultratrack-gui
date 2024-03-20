import { Box } from "@mantine/core";
import { computeChartOptions } from "./statisticsService";
import { useAppSelector } from "../../common/hooks";
import ReactECharts from "echarts-for-react";
import { fromTimeToFrame } from "../video/videoUtils";

const Chart = () => {
  const { computedFascicleLengths, sampleFasicleLengths } = useAppSelector(
    (state) => state.fascicle
  );

  const { metadata } = useAppSelector((state) => state.video);

  if (!metadata) {
    return;
  }

  const { currentTime, duration } = metadata;

  const sampleIds = sampleFasicleLengths.map(({ sampleId }) => sampleId);

  const chartOptions = computeChartOptions(
    computedFascicleLengths,
    sampleIds,
    duration
  );

  if (chartOptions.series.length > 0) {
    const currentFrame = fromTimeToFrame(currentTime);

    chartOptions.series[0].markLine = {
      silent: true,
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

  console.log(chartOptions);

  return (
    <Box>
      <ReactECharts option={chartOptions} style={{ height: 400 }} />
    </Box>
  );
};

export default Chart;
