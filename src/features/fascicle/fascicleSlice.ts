import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FascicleLengthFrames, FascicleLengthPoint } from "./fascicleModels";
import { getFirstAvailableSampleId } from "../renderCommon/renderUtils";

interface FascicleState {
  computedFascicleLengths: FascicleLengthFrames;
  sampleFascicleLengths: FascicleLengthFrames;
}

interface SetComputedFascicleLengthsPayload {
  computedFascicleLengths: FascicleLengthFrames;
}

interface RemoveSampleFascicleLengthPayload {
  sampleId: string;
}

export interface AddSampleFascicleLengthPayload {
  point1: FascicleLengthPoint;
  point2: FascicleLengthPoint;
  frameNumber: number;
}

export interface SetVisibleFascicleLengthPayload {
  frameNumber: number;
  sampleId: string;
  newValue: boolean;
}

const initialState: FascicleState = {
  computedFascicleLengths: {},
  sampleFascicleLengths: {},
};

export const fascicleSlice = createSlice({
  name: "fascicle",
  initialState,
  reducers: {
    setComputedFascicleLengths: (
      state,
      action: PayloadAction<SetComputedFascicleLengthsPayload>
    ) => {
      const { computedFascicleLengths } = action.payload;

      state.computedFascicleLengths = computedFascicleLengths;
    },
    removeSampleFascicleLength: (
      state,
      action: PayloadAction<RemoveSampleFascicleLengthPayload>
    ) => {
      const { sampleId } = action.payload;

      [state.sampleFascicleLengths, state.computedFascicleLengths].forEach(
        (frames) => {
          Object.entries(frames).forEach(([frameNumber, frame]) => {
            const filteredFrame = frame.filter(
              (length) => length.sampleId !== sampleId
            );

            frames[frameNumber] = filteredFrame;
          });
        }
      );
    },
    clearSampleFascicleLengths: (state) => {
      state.sampleFascicleLengths = {};
    },
    clearComputedFascicleLengths: (state) => {
      state.computedFascicleLengths = {};
    },
    addSampleFascicleLength: (
      state,
      action: PayloadAction<AddSampleFascicleLengthPayload>
    ) => {
      const { point1, point2, frameNumber } = action.payload;
      const { sampleFascicleLengths } = state;

      const sampleId = getFirstAvailableSampleId(sampleFascicleLengths);

      if (!sampleFascicleLengths[frameNumber]) {
        sampleFascicleLengths[frameNumber] = [];
      }

      sampleFascicleLengths[frameNumber].push({
        sampleId,
        point1,
        point2,
      });
    },
    setVisibleFascicleLength: (
      state,
      action: PayloadAction<SetVisibleFascicleLengthPayload>
    ) => {
      const { frameNumber, sampleId, newValue } = action.payload;

      const frame = state.sampleFascicleLengths[frameNumber];

      if (!frame) return;

      const length = frame.find((length) => length.sampleId === sampleId);

      if (!length) return;

      length.visible = newValue;
    },
  },
});

export const {
  setComputedFascicleLengths,
  removeSampleFascicleLength,
  clearSampleFascicleLengths,
  clearComputedFascicleLengths,
  addSampleFascicleLength,
  setVisibleFascicleLength,
} = fascicleSlice.actions;

export default fascicleSlice.reducer;
