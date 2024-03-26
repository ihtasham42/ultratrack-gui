import { Card, Group, Title } from "@mantine/core";
import SampleFascicleTable from "./SampleFascicleTable";
import SampleFascicleAddButton from "./SampleFascicleAddButton";

const SampleFascicleContainer = () => {
  return (
    <Card withBorder>
      <Group align="center" mb="sm">
        <Title order={5}>Sample Fascicle Lengths</Title>
        <SampleFascicleAddButton />
      </Group>

      <SampleFascicleTable />
    </Card>
  );
};

export default SampleFascicleContainer;
