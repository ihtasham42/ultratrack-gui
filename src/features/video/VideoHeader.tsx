import { ActionIcon, Group, Paper, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useAppDispatch } from "../../common/hooks";
import { clearComputedRois, clearSampleRois } from "../roi/roiSlice";
import {
  clearComputedFascicleLengths,
  clearSampleFascicleLengths,
} from "../fascicle/fascicleSlice";
import { removeVideo } from "./videoSlice";

type Props = {
  name: string;
};

const VideoHeader = ({ name }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemoveVideo = () => {
    dispatch(clearSampleRois());
    dispatch(clearComputedRois());
    dispatch(clearSampleFascicleLengths());
    dispatch(clearComputedFascicleLengths());
    dispatch(removeVideo());
  };

  return (
    <Group mb="sm" gap="xs">
      <Paper>
        <Text size="lg">{name}</Text>
      </Paper>

      <ActionIcon color="red" onClick={handleRemoveVideo}>
        <IconX />
      </ActionIcon>
    </Group>
  );
};

export default VideoHeader;
