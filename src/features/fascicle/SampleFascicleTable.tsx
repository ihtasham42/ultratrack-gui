import { ActionIcon, Group, Table } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { IconEye, IconX } from "@tabler/icons-react";
import SampleColorBadge from "../../common/components/SampleColorBadge";
import { removeSampleFascicleLength } from "./fascicleSlice";
import { getFlattenedRenderObjects } from "../renderCommon/renderUtils";
import { FascicleLengthWithFrameNumber } from "./fascicleModels";

const SampleFascicleTable = () => {
  const { sampleFascicleLengths } = useAppSelector((state) => state.fascicle);
  const dispatch = useAppDispatch();

  const flattenedLengths = getFlattenedRenderObjects(
    sampleFascicleLengths
  ) as FascicleLengthWithFrameNumber[];

  const handleRemoveSampleFascicleLength = (sampleId: string) => {
    const payload = { sampleId };

    dispatch(removeSampleFascicleLength(payload));
  };

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Color</Table.Th>
          <Table.Th>Frame #</Table.Th>
          <Table.Th>Controls</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {flattenedLengths.map(({ sampleId, frameNumber, visible }) => (
          <Table.Tr key={sampleId}>
            <Table.Td>
              <SampleColorBadge sampleId={sampleId} />
            </Table.Td>
            <Table.Td>{frameNumber}</Table.Td>
            <Table.Td>
              <Group gap="xs">
                <ActionIcon
                  size="sm"
                  color="red"
                  onClick={() => handleRemoveSampleFascicleLength(sampleId)}
                >
                  <IconX />
                </ActionIcon>
                <ActionIcon size="sm" color={visible ? "blue" : "gray"}>
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

export default SampleFascicleTable;
