import { Card, Title } from "@mantine/core";
import Chart from "./Chart";

const StatisticsContainer = () => {
  return (
    <Card withBorder>
      <Title order={5} mb="sm">
        Fascicle Length Over Time
      </Title>
      <Chart />
    </Card>
  );
};

export default StatisticsContainer;
