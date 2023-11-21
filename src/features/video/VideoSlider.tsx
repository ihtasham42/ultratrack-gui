import { ActionIcon, Group, Slider } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
} from "@tabler/icons-react";

type Props = {};

const VideoSlider = (props: Props) => {
  return (
    <Group>
      <Slider style={{ flex: 1 }} color="blue" />{" "}
      <Group gap={8}>
        <ActionIcon>
          <IconChevronLeft />
        </ActionIcon>
        <ActionIcon>
          <IconPlayerPlay />
        </ActionIcon>
        <ActionIcon>
          <IconChevronRight />
        </ActionIcon>
      </Group>
    </Group>
  );
};

export default VideoSlider;
