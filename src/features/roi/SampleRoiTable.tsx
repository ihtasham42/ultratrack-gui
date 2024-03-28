import { ActionIcon, Checkbox, Group, Table } from "@mantine/core";
import SampleColorBadge from "../../common/components/SampleColorBadge";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { removeSampleRoi, setFixedRoi } from "./roiSlice";
import { IconEye, IconX } from "@tabler/icons-react";
import { getFlattenedRenderObjects } from "../renderCommon/renderUtils";
import { RoiWithFrameNumber } from "./roiModels";

const SampleRoiTable = () => {
  const { sampleRois } = useAppSelector((state) => state.roi);
  const dispatch = useAppDispatch();

  const flattenedRois = getFlattenedRenderObjects(
    sampleRois
  ) as RoiWithFrameNumber[];

  const handleRemoveSampleRoi = (sampleId: string) => {
    const payload = { sampleId };

    dispatch(removeSampleRoi(payload));
  };

  const handleSetFixedRoi = (
    event: React.FormEvent<HTMLInputElement>,
    sampleId: string,
    frameNumber: number
  ) => {
    const payload = {
      newValue: event.currentTarget.checked,
      sampleId,
      frameNumber,
    };

    dispatch(setFixedRoi(payload));
  };

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Color</Table.Th>
          <Table.Th>Frame #</Table.Th>
          <Table.Th>Controls</Table.Th>
          <Table.Th>Fixed</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {flattenedRois.map(({ sampleId, frameNumber, fixed }) => (
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
                  onClick={() => handleRemoveSampleRoi(sampleId)}
                >
                  <IconX />
                </ActionIcon>
                <ActionIcon size="sm">
                  <IconEye />
                </ActionIcon>
              </Group>
            </Table.Td>
            <Table.Td>
              <Checkbox
                checked={fixed}
                onChange={(event) =>
                  handleSetFixedRoi(event, sampleId, frameNumber)
                }
              />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default SampleRoiTable;
