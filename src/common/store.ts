import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import fascicleReducer from "../features/fascicle/fascicleSlice";
import roiReducer from "../features/roi/roiSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    fascicle: fascicleReducer,
    roi: roiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
