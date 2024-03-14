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
import {
  pauseVideo,
  playVideo,
  stepBackward,
  stepForward,
  updateCurrentTime,
} from "./videoSlice";

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

  const handleStepForward = () => {
    dispatch(stepForward());
  };

  const handleStepBackward = () => {
    dispatch(stepBackward());
  };

  const handleNumberInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget && e.key === "Enter") {
      const payload = { time: parseFloat(e.currentTarget.value) };

      dispatch(updateCurrentTime(payload));
    }
  };

  return (
    <Group gap="xs">
      <ActionIcon onClick={handleStepBackward}>
        <IconChevronLeft />
      </ActionIcon>
      <ActionIcon onClick={handlePlaybackStateChange}>
        {playbackState === VideoPlaybackState.PLAYING && <IconPlayerPause />}
        {playbackState === VideoPlaybackState.PAUSED && <IconPlayerPlay />}
      </ActionIcon>
      <ActionIcon onClick={handleStepForward}>
        <IconChevronRight />
      </ActionIcon>
      <TextInput
        type="number"
        size="xs"
        w={100}
        value={currentFrame}
        onKeyDown={handleNumberInputEnter}
        rightSection={" /" + maxFrame.toString()}
      />
    </Group>
  );
};

export default VideoControls;
