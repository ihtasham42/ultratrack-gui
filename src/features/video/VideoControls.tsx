import { ActionIcon, Group, TextInput } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useAppSelector } from "../../common/hooks";
import { fromTimeToFrame } from "./videoUtils";

const VideoControls = () => {
  const { metadata } = useAppSelector((state) => state.video);

  if (!metadata) {
    return null;
  }

  const { duration, currentTime } = metadata;

  const maxFrame = fromTimeToFrame(duration);
  const currentFrame = fromTimeToFrame(currentTime);

  return (
    <Group gap="xs">
      <ActionIcon>
        <IconChevronLeft />
      </ActionIcon>
      <ActionIcon>
        <IconPlayerPlay />
      </ActionIcon>
      <ActionIcon>
        <IconChevronRight />
      </ActionIcon>
      <TextInput
        type="number"
        size="xs"
        w={100}
        value={currentFrame}
        rightSection={" /" + maxFrame.toString()}
      />
    </Group>
  );
};

export default VideoControls;
