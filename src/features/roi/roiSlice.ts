import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RoiFrames, RoiPoint } from "./roiModels";
import { getFirstAvailableSampleId } from "../renderCommon/renderUtils";

interface RoiState {
  computedRois: RoiFrames;
  sampleRois: RoiFrames;
}

interface SetComputedRoisPayload {
  computedRois: RoiFrames;
}

interface RemoveSampleRoiPayload {
  sampleId: string;
}

export interface AddSampleRoiPayload {
  points: RoiPoint[];
  frameNumber: number;
}

const initialState: RoiState = {
  computedRois: {},
  sampleRois: {},
};

export const roiSlice = createSlice({
  name: "roi",
  initialState,
  reducers: {
    setComputedRois: (state, action: PayloadAction<SetComputedRoisPayload>) => {
      const { computedRois } = action.payload;

      state.computedRois = computedRois;
    },
    removeSampleRoi: (state, action: PayloadAction<RemoveSampleRoiPayload>) => {
      const { sampleId } = action.payload;

      [state.sampleRois, state.computedRois].forEach((frames) => {
        Object.entries(frames).forEach(([frameNumber, frame]) => {
          const filteredFrame = frame.filter(
            (length) => length.sampleId !== sampleId
          );

          frames[frameNumber] = filteredFrame;
        });
      });
    },
    clearSampleRois: (state) => {
      state.sampleRois = {};
    },
    clearComputedRois: (state) => {
      state.computedRois = {};
    },
    addSampleRoi: (state, action: PayloadAction<AddSampleRoiPayload>) => {
      const { points, frameNumber } = action.payload;
      const { sampleRois } = state;

      const sampleId = getFirstAvailableSampleId(sampleRois);

      if (!sampleRois[frameNumber]) {
        sampleRois[frameNumber] = [];
      }

      sampleRois[frameNumber].push({
        sampleId,
        points,
        fixed: false,
      });
    },
  },
});

export const {
  setComputedRois,
  removeSampleRoi,
  clearSampleRois,
  clearComputedRois,
  addSampleRoi,
} = roiSlice.actions;

export default roiSlice.reducer;
