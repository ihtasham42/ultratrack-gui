import { LineChart } from "@mantine/charts";
import { Box } from "@mantine/core";

const Chart = () => {
  return (
    <Box>
      <LineChart
        legendProps={{ verticalAlign: "top" }}
        data={[
          { Apples: 3, Oranges: 4 },
          { Apples: 2, Oranges: 8 },
          { Apples: 1 },
        ]}
        dataKey="Frame"
        series={[
          { name: "Apples", color: "indigo.6" },
          { name: "Oranges", color: "blue.6" },
          { name: "Tomatoes", color: "teal.6" },
        ]}
        curveType="linear"
      />
    </Box>
  );
};

export default Chart;
