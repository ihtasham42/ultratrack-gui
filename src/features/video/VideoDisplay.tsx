import { Box } from "@mantine/core";
import { useAppSelector } from "../../common/hooks";
import VideoSlider from "./VideoSlider";

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
      <VideoSlider />
    </Box>
  );
};

export default VideoDisplay;
