import { Card, Title } from "@mantine/core";
import SampleFascicleEntries from "./SampleFascicleEntries";

const SampleFascicleContainer = () => {
  return (
    <Card withBorder>
      <Title mb="sm" order={5}>
        Sample Fascicle Lengths
      </Title>
      <SampleFascicleEntries />
    </Card>
  );
};

export default SampleFascicleContainer;
