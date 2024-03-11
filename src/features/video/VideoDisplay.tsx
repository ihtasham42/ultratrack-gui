import { Box } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import VideoFooter from "./VideoFooter";
import { useEffect, useRef } from "react";
import { VideoPlaybackState } from "./videoModels";
import { updateCurrentTime } from "./videoSlice";

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

    if (!video) {
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

  const { playbackState, currentTime } = metadata;

  return (
    <Box>
      <Box>
        <video src={source} ref={videoRef} width="100%">
          Your browser does not support the video tag.
        </video>
      </Box>
      <VideoFooter />
    </Box>
  );
};

export default VideoDisplay;
