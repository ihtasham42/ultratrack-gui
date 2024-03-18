import { Box, Flex } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import VideoFooter from "./VideoFooter";
import { useEffect, useRef } from "react";
import { VideoPlaybackState } from "./videoModels";
import { updateCurrentTime } from "./videoSlice";
import CanvasDisplay from "./CanvasDisplay";

const VideoDisplay = () => {
  const { source, metadata } = useAppSelector((state) => state.video);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();
  const playbackState = metadata?.playbackState;
  const currentTime = metadata?.currentTime;

  const playbackStateRef = useRef(playbackState);

  useEffect(() => {
    playbackStateRef.current = playbackState;
  }, [playbackState]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !metadata) {
      return;
    }

    if (playbackState === VideoPlaybackState.PLAYING) {
      video.play();
    } else if (playbackState === VideoPlaybackState.PAUSED) {
      video.pause();
    }
  }, [playbackState]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !metadata) {
      return;
    }

    // Convert both times to a fixed precision to avoid floating point issues.
    const videoTime = parseFloat(video.currentTime.toFixed(3));
    const targetTime = parseFloat(metadata.currentTime.toFixed(3));

    // Only update the video's currentTime if it differs from the targetTime.
    // Adjust the precision as needed for your use case.
    if (Math.abs(videoTime - targetTime) > 0.01) {
      video.currentTime = metadata.currentTime;
    }
  }, [currentTime]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video || !metadata) {
      return;
    }

    if (playbackStateRef.current === VideoPlaybackState.PAUSED) {
      return;
    }

    const payload = {
      time: video.currentTime,
    };

    dispatch(updateCurrentTime(payload));
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !metadata) {
      return;
    }

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [source]);

  if (!source || !metadata) {
    return;
  }

  const { name } = metadata;

  return (
    <Box style={{ position: "relative", width: "100%" }}>
      <Box w="100%" ta="center" mb="md">
        <Flex justify="center">
          <div>{name}</div>
        </Flex>
      </Box>
      <Box>
        <video src={source} ref={videoRef} width="100%">
          Your browser does not support the video tag.
        </video>
      </Box>
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <CanvasDisplay />
      </Box>
      <VideoFooter />
    </Box>
  );
};

export default VideoDisplay;
