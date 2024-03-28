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

const mockComputed: FascicleLengthFrames = {};

for (let i = 0; i <= 350; i++) {
  const frame = [
    {
      sampleId: "1",
      point1: { x: 100 + i * 0.5, y: 300 + i * 1.75 },
      point2: { x: 500, y: 500 },
    },
    {
      sampleId: "2",
      point1: { x: 50 + i * 0.25, y: 250 + i * 1.5 },
      point2: { x: 450, y: 475 },
    },
    {
      sampleId: "3",
      point1: { x: 100 + i * 0.5, y: 225 + i * 1.25 },
      point2: { x: 400, y: 425 },
    },
  ];

  mockComputed[i] = frame;
}

const initialState: FascicleState = {
  computedFascicleLengths: {},
  sampleFascicleLengths: {
    "0": [
      {
        sampleId: "1",
        point1: { x: 100, y: 300 },
        point2: { x: 500, y: 500 },
      },
      {
        sampleId: "2",
        point1: { x: 50, y: 250 },
        point2: { x: 450, y: 475 },
      },
      {
        sampleId: "3",
        point1: { x: 100, y: 225 },
        point2: { x: 400, y: 425 },
      },
    ],
  },
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
  },
});

export const {
  setComputedFascicleLengths,
  removeSampleFascicleLength,
  clearSampleFascicleLengths,
  clearComputedFascicleLengths,
  addSampleFascicleLength,
} = fascicleSlice.actions;

export default fascicleSlice.reducer;
