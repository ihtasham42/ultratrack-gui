import { Group, Stack, Text, Title } from "@mantine/core";

const NoDataChart = () => {
  return (
    <Group h="100%" w="100%" align="center" justify="center">
      <Stack align="center">
        <Title>No Data Available</Title>
        <Text>Compute fascicle lengths below</Text>
      </Stack>
    </Group>
  );
};

export default NoDataChart;
