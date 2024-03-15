import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../features/video/videoSlice";
import fascicleReducer from "../features/fascicle/fascicleSlice";

export const store = configureStore({
    reducer: {
        video: videoReducer,
        fascicle: fascicleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch