import { ActionIcon, Group, Slider, TextInput } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useAppSelector } from "../../common/hooks";

const VideoSlider = () => {
  const { duration } = useAppSelector((state) => state.video.metadata);

  return (
    <Group align="center">
      <Slider style={{ flex: 1 }} color="blue" />

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
        <TextInput size="xs" w={70} rightSection="/30" />
      </Group>
    </Group>
  );
};

export default VideoSlider;
