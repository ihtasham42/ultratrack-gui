import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setComputedFascicleLengths } from "../fascicle/fascicleSlice";
import { setComputedRois } from "../roi/roiSlice";
import { COMPUTE_VIDEO_ENDPOINT, ComputeVideoResponse } from "./managerModels";

interface ManagerState {
  loading: boolean;
  error: boolean;
}

const initialState: ManagerState = {
  loading: false,
  error: false,
};

export const computeVideo = createAsyncThunk(
  "manager/computeVideo",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response: ComputeVideoResponse = await fetch(
        COMPUTE_VIDEO_ENDPOINT
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
