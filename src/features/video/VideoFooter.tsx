import { Group } from "@mantine/core";
import VideoControls from "./VideoControls";
import VideoSlider from "./VideoSlider";

const VideoFooter = () => {
  return (
    <Group align="center" mb="md">
      <VideoSlider />
      <VideoControls />
    </Group>
  );
};

export default VideoFooter;
