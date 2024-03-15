import { Box } from "@mantine/core";
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

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !metadata) {
      return;
    }

    const { playbackState } = metadata;

    if (playbackState === VideoPlaybackState.PLAYING) {
      video.play();
    } else if (playbackState === VideoPlaybackState.PAUSED) {
      video.pause();
    }
  }, [metadata]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video || !metadata) {
      return;
    }

    const { playbackState } = metadata;

    if (playbackState === VideoPlaybackState.PAUSED) {
      return;
    }

    const payload = {
      time: video.currentTime,
    };

    if (Math.abs(video.currentTime - currentTime) > 0.5) {
      dispatch(updateCurrentTime(payload));
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !metadata) {
      return;
    }

    const { currentTime } = metadata;

    video.addEventListener("timeupdate", handleTimeUpdate);

    video.currentTime = currentTime;

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [metadata]);

  if (!source || !metadata) {
    return;
  }

  const { currentTime } = metadata;

  return (
    <Box style={{ position: "relative", width: "100%" }}>
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
