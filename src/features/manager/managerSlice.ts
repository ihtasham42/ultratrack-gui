import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setComputedFascicleLengths } from "../fascicle/fascicleSlice";
import { setComputedRois } from "../roi/roiSlice";
import { COMPUTE_VIDEO_ENDPOINT, ComputeVideoResponse } from "./managerModels";
import { ThunkConfig } from "../../common/store";
import { fromTimeToFrame } from "../video/videoUtils";
interface ManagerState {
  loading: boolean;
  error: boolean;
}

const initialState: ManagerState = {
  loading: false,
  error: false,
};

export const computeVideo = createAsyncThunk<undefined, void, ThunkConfig>(
  "manager/computeVideo",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState();

      const { sampleFascicleLengths } = state.fascicle;
      const { sampleRois } = state.roi;
      const { metadata } = state.video;

      if (!metadata) {
        throw Error;
      }

      const { duration } = metadata;
      const maxFrame = fromTimeToFrame(duration);

      const payload = {
        sampleFascicleLengths,
        sampleRois,
        maxFrame,
      };

      const response: ComputeVideoResponse = await fetch(
        COMPUTE_VIDEO_ENDPOINT,
        {
          body: JSON.stringify(payload),
          method: "POST",
        }
      ).then((response) => response.json());

      const { computedFascicleLengths, computedRois } = response;

      dispatch(
        setComputedFascicleLengths({
          computedFascicleLengths,
        })
      );

      dispatch(
        setComputedRois({
          computedRois,
        })
      );
    } catch (err) {
      console.log(err);
      return rejectWithValue({});
    }
  }
);

export const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(computeVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(computeVideo.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(computeVideo.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export default managerSlice.reducer;
