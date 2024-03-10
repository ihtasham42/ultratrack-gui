import { Box, Stack } from "@mantine/core";
import UploadRegion from "./UploadRegion";
import { useAppSelector } from "../../common/hooks";
import VideoDisplay from "./VideoDisplay";

const MAX_WIDTH = "600px";

const VideoContainer = () => {
  const { source } = useAppSelector((state) => state.video);

  return (
    <Stack maw={MAX_WIDTH}>
      <Box>{source ? <VideoDisplay /> : <UploadRegion />}</Box>
    </Stack>
  );
};

export default VideoContainer;
