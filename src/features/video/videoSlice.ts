import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VideoMetadata, VideoPlaybackState } from "./videoModels";
import { fromFrameToTime } from "./videoUtils";

interface VideoState {
  source?: string;
  metadata?: VideoMetadata;
}

interface UploadVideoPayload {
  source: string;
  duration: number;
}

interface UpdateCurrentTimePayload {
  time: number
}
interface SetCurrentTimePayload  {
  time: number;
}

const initialState: VideoState = {
  source: undefined,
  metadata: undefined,
};

const setCurrentTime = (state: VideoState, time: number) => {
  if (state.metadata) {
    const {duration } = state.metadata

    if (time < 0) {
      time = 0
    } else if (time >= duration) {
      time = duration
      state.metadata.playbackState = VideoPlaybackState.PAUSED
    }
    state.metadata.currentTime = time
  }
}

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
        const {currentTime} = state.metadata

        setCurrentTime(state, currentTime + fromFrameToTime(1))
      }
    },
    stepBackward: (state) => {
      if (state.metadata) {
        const {currentTime} = state.metadata

        setCurrentTime(state, currentTime - fromFrameToTime(1))
      }
    },
    jumpToTime: (state, action: PayloadAction<SetCurrentTimePayload>) => {
      if (state.metadata) {
        const {time} = action.payload

        setCurrentTime(state, time)
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
    },
    updateCurrentTime: (state, action: PayloadAction<UpdateCurrentTimePayload>) => {
      if (state.metadata) {
        const { time } = action.payload
        
        setCurrentTime(state, time)
      }
    }
  },
});

export const { uploadVideo, playVideo, pauseVideo, stepForward, stepBackward, jumpToTime, updateCurrentTime } = videoSlice.actions;

export default videoSlice.reducer;
