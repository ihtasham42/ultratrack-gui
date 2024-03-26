import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RoiFrame, RoiFrames } from "./roiModels";

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

const mockComputed: RoiFrames = {};

for (let i = 0; i <= 350; i++) {
  const frame: RoiFrame = [
    {
      sampleId: "1",
      points: [
        { x: 150, y: 200 },
        { x: 475, y: 300 },
        { x: 425, y: 500 },
        { x: 100, y: 380 },
      ],
      fixed: false,
    },
  ];

  mockComputed[i] = frame;
}

const initialState: RoiState = {
  computedRois: mockComputed,
  sampleRois: {
    "0": [
      {
        sampleId: "1",
        points: [
          { x: 150, y: 200 },
          { x: 475, y: 300 },
          { x: 425, y: 500 },
          { x: 100, y: 380 },
        ],
        fixed: false,
      },
    ],
  },
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
  },
});

export const { setComputedRois, removeSampleRoi } = roiSlice.actions;

export default roiSlice.reducer;
