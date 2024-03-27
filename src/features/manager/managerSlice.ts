import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setComputedFascicleLengths } from "../fascicle/fascicleSlice";
import { setComputedRois } from "../roi/roiSlice";
import { COMPUTE_VIDEO_ENDPOINT, ComputeVideoResponse } from "./managerModels";
import { RootState, ThunkConfig } from "../../common/store";
import { AppDispatch } from "../../common/store";
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
      const { sampleFascicleLengths } = getState().fascicle;
      const { sampleRois } = getState().roi;

      const payload = {
        sampleFascicleLengths,
        sampleRois,
      };

      const response: ComputeVideoResponse = await fetch(
        COMPUTE_VIDEO_ENDPOINT,
        {
          body: JSON.stringify(payload),
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
