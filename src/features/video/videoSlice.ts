import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VideoMetadata, VideoPlaybackState } from "./videoModels";
import { fromFrameToSeconds } from "./videoUtils";

interface VideoState {
  source?: string;
  metadata?: VideoMetadata;
}

interface UploadVideoPayload {
  source: string;
  duration: number;
}

interface SetCurrentTimePayload  {
  time: number;
}

const initialState: VideoState = {
  source: undefined,
  metadata: undefined,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
  uploadVideo: (state, action: PayloadAction<UploadVideoPayload>) => {
      const { source, duration } = action.payload;

      state.source = source;
      state.metadata = {
        duration,
        currentTime: 0,
        playbackState: VideoPlaybackState.PAUSED,
      };
    },
    stepForward: (state) => {
      if (state.metadata) {
        state.metadata.currentTime += fromFrameToSeconds(1);
      }
    },
    stepBackward: (state) => {
      if (state.metadata) {
        state.metadata.currentTime -= fromFrameToSeconds(1);
      }
    },
    setCurrentTime: (state, action: PayloadAction<SetCurrentTimePayload>) => {
      if (state.metadata) {
        const {time} = action.payload

        state.metadata.currentTime = time
      }
    },
    playVideo: (state) => {
      if (state.metadata) {
        state.metadata.playbackState = VideoPlaybackState.PLAYING
      }
    },
    pauseVideo: (state) => {
      if (state.metadata) {
        state.metadata.playbackState = VideoPlaybackState.PAUSED
      }
    }
  },
});

export const { uploadVideo } = videoSlice.actions;

export default videoSlice.reducer;
