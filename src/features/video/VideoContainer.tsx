import { Box, Container, Stack } from "@mantine/core";
import UploadRegion from "./UploadRegion";
import { useAppSelector } from "../../common/hooks";
import VideoDisplay from "./VideoDisplay";
import VideoSlider from "./VideoSlider";

type Props = {};

const MAX_WIDTH = "600px";

const VideoContainer = (props: Props) => {
  const { video } = useAppSelector((state) => state.video);

  return (
    <Stack style={{ maxWidth: MAX_WIDTH }}>
      <Box>{video ? <VideoDisplay /> : <UploadRegion />}</Box>
      <VideoSlider />
    </Stack>
  );
};

export default VideoContainer;
