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

export interface SetFixedRoiPayload {
  frameNumber: number;
  sampleId: string;
  newValue: boolean;
}

export interface SetVisibleRoiPayload {
  frameNumber: number;
  sampleId: string;
  newValue: boolean;
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
        fixed: true,
        visible: true,
      });
    },
    setFixedRoi: (state, action: PayloadAction<SetFixedRoiPayload>) => {
      const { frameNumber, sampleId, newValue } = action.payload;

      const frame = state.sampleRois[frameNumber];

      if (!frame) return;

      const roi = frame.find((roi) => roi.sampleId === sampleId);

      if (!roi) return;

      roi.fixed = newValue;
    },
    setVisibleRoi: (state, action: PayloadAction<SetVisibleRoiPayload>) => {
      const { frameNumber, sampleId, newValue } = action.payload;

      const frame = state.sampleRois[frameNumber];

      if (!frame) return;

      const roi = frame.find((roi) => roi.sampleId === sampleId);

      if (!roi) return;

      roi.visible = newValue;
    },
  },
});

export const {
  setComputedRois,
  removeSampleRoi,
  clearSampleRois,
  clearComputedRois,
  addSampleRoi,
  setFixedRoi,
  setVisibleRoi,
} = roiSlice.actions;

export default roiSlice.reducer;
