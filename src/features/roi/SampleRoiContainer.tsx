import { Card, Group, Title } from "@mantine/core";
import SampleFascicleAddButton from "../fascicle/SampleFascicleAddButton";
import SampleRoiTable from "./SampleRoiTable";

const SampleRoiContainer = () => {
  return (
    <Card withBorder>
      <Group align="between" mb="sm">
        <Title order={5}>Sample ROIs</Title>
        <SampleFascicleAddButton />
      </Group>

      <SampleRoiTable />
    </Card>
  );
};

export default SampleRoiContainer;
