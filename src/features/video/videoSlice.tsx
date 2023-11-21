import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface VideoState {
  video?: string;
  currentFrameNumber?: number;
}

const initialState: VideoState = {
  video: undefined,
  currentFrameNumber: undefined,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    uploadVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
      state.currentFrameNumber = 0;
    },
  },
});

export const { uploadVideo } = videoSlice.actions;

export default videoSlice.reducer;
