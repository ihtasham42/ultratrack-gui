import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Group,
  Table,
  Text,
} from "@mantine/core";
import { useAppSelector } from "../../common/hooks";
import {
  getFascicleLengthColor,
  getFlattenedSampleFascicleLengths,
} from "./fascicleUtils";
import { getDistanceBetweenPoints } from "../statistics/statisticsService";
import { IconEye, IconX } from "@tabler/icons-react";

const SampleFascicleEntries = () => {
  const { sampleFascicleLengths } = useAppSelector((state) => state.fascicle);

  const flattenedLengths = getFlattenedSampleFascicleLengths(
    sampleFascicleLengths
  );

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Color</Table.Th>
          <Table.Th>Frame #</Table.Th>
          <Table.Th>
            Positions <span color="grey">&#123;x1, y1, x2, y2&#125;</span>
          </Table.Th>
          <Table.Th>Length</Table.Th>
          <Table.Th>Controls</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {flattenedLengths.map(({ sampleId, point1, point2, frameNumber }) => (
          <Table.Tr>
            <Table.Td>
              <Box
                style={{
                  borderRadius: "50%",
                  backgroundColor: getFascicleLengthColor(sampleId),
                  width: 10,
                  height: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Table.Td>
            <Table.Td>{frameNumber}</Table.Td>
            <Table.Td>
              &#123;{point1.x}, {point1.y}, {point2.x}, {point2.y}&#125;
            </Table.Td>
            <Table.Td>{getDistanceBetweenPoints(point1, point2)}</Table.Td>
            <Table.Td>
              <Group gap="xs">
                <ActionIcon size="sm" color="red">
                  <IconX />
                </ActionIcon>
                <ActionIcon size="sm">
                  <IconEye />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default SampleFascicleEntries;
