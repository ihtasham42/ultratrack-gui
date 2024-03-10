import { ActionIcon, Group, TextInput } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { fromTimeToFrame } from "./videoUtils";
import { VideoPlaybackState } from "./videoModels";
import { pauseVideo, playVideo } from "./videoSlice";

const VideoControls = () => {
  const { metadata } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  if (!metadata) {
    return null;
  }

  const { duration, currentTime, playbackState } = metadata;

  const maxFrame = fromTimeToFrame(duration);
  const currentFrame = fromTimeToFrame(currentTime);

  const handlePlaybackStateChange = () => {
    if (playbackState === VideoPlaybackState.PAUSED) {
      dispatch(playVideo());
    } else if (playbackState === VideoPlaybackState.PLAYING) {
      dispatch(pauseVideo());
    }
  };

  return (
    <Group gap="xs">
      <ActionIcon>
        <IconChevronLeft />
      </ActionIcon>
      <ActionIcon onClick={handlePlaybackStateChange}>
        {playbackState === VideoPlaybackState.PLAYING && <IconPlayerPause />}
        {playbackState === VideoPlaybackState.PAUSED && <IconPlayerPlay />}
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
