import { Box } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import VideoFooter from "./VideoFooter";
import { useEffect, useRef } from "react";
import { VideoPlaybackState } from "./videoModels";
import { updateCurrentTime } from "./videoSlice";
import CanvasDisplay from "./CanvasDisplay";
import VideoHeader from "./VideoHeader";

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

    const videoTime = parseFloat(video.currentTime.toFixed(3));
    const targetTime = parseFloat(metadata.currentTime.toFixed(3));

    if (Math.abs(videoTime - targetTime) > 0.01) {
      video.currentTime = metadata.currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let lastTime = -1;
    let animationFrameId: number;

    const frame = () => {
      if (!video) return;

      const currentTime = video.currentTime;

      if (Math.abs(currentTime - lastTime) >= 0.03) {
        lastTime = currentTime;

        const payload = {
          time: currentTime,
        };
        dispatch(updateCurrentTime(payload));
      }

      animationFrameId = requestAnimationFrame(frame);
    };

    animationFrameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [source, dispatch]);

  if (!source || !metadata) {
    return;
  }

  const { name } = metadata;

  return (
    <Box>
      <VideoHeader name={name} />
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
    </Box>
  );
};

export default VideoDisplay;
