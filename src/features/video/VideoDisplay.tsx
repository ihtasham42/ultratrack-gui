import { Box } from "@mantine/core";
import { useAppSelector } from "../../common/hooks";
import VideoFooter from "./VideoFooter";

const VideoDisplay = () => {
  const { source } = useAppSelector((state) => state.video);
  console.log(source);
  return (
    <Box>
      <Box>
        <video src={source} width="100%">
          Your browser does not support the video tag.
        </video>
      </Box>
      <VideoFooter />
    </Box>
  );
};

export default VideoDisplay;
