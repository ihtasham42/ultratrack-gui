import { describe, expect, it } from "vitest";
import roiSlice, {
  addSampleRoi,
  clearComputedRois,
  clearSampleRois,
  removeSampleRoi,
  setComputedRois,
  setFixedRoi,
  setVisibleRoi,
} from "./roiSlice";

const DEFAULT_ROI_POINT = {
  x: 0,
  y: 0,
};

const DEFAULT_ROI = {
  sampleId: "1",
  points: [
    { ...DEFAULT_ROI_POINT },
    { ...DEFAULT_ROI_POINT },
    { ...DEFAULT_ROI_POINT },
  ],
  visible: true,
  fixed: true,
};

describe("roiSlice", () => {
  const initialState = {
    computedRois: {},
    sampleRois: {},
  };

  it("should handle setting the computed rois", () => {
    const computedRois = {
      ["1"]: [{ ...DEFAULT_ROI }],
    };

    const state = roiSlice(initialState, setComputedRois({ computedRois }));

    expect(Object.keys(state.computedRois)).toHaveLength(1);
    expect(state.computedRois).toBe(computedRois);
  });

  it("should handle removing a sample roi", () => {
    const stateBefore = {
      ...initialState,
      sampleRois: {
        ["1"]: [{ ...DEFAULT_ROI, sampleId: "1" }],
      },
    };

    const state = roiSlice(stateBefore, removeSampleRoi({ sampleId: "1" }));

    Object.values(state.sampleRois).forEach((frame) => {
      expect(frame.find(({ sampleId }) => sampleId === "1")).toBeUndefined();
    });
  });

  it("should handle clearing the sample rois", () => {
    const stateBefore = {
      ...initialState,
      sampleRois: {
        ["1"]: [{ ...DEFAULT_ROI }],
      },
    };

    const state = roiSlice(stateBefore, clearSampleRois());

    expect(state.sampleRois).toStrictEqual({});
  });

  it("should handle clearing the computed rois", () => {
    const stateBefore = {
      ...initialState,
      computedRois: {
        ["1"]: [{ ...DEFAULT_ROI }],
      },
    };

    const state = roiSlice(stateBefore, clearComputedRois());

    expect(state.computedRois).toStrictEqual({});
  });

  it("should handle adding the sample roi", () => {
    const state = roiSlice(
      initialState,
      addSampleRoi({
        points: [{ ...DEFAULT_ROI_POINT }, { ...DEFAULT_ROI_POINT }],
        frameNumber: 1,
      })
    );

    expect(state.sampleRois["1"]).toHaveLength(1);

    const stateAfterAnotherAdd = roiSlice(
      state,
      addSampleRoi({
        points: [{ ...DEFAULT_ROI_POINT }, { ...DEFAULT_ROI_POINT }],
        frameNumber: 1,
      })
    );

    expect(stateAfterAnotherAdd.sampleRois["1"]).toHaveLength(2);
  });

  it("should handle setting the roi's visiblity", () => {
    const state = roiSlice(
      initialState,
      addSampleRoi({
        points: [{ ...DEFAULT_ROI_POINT }, { ...DEFAULT_ROI_POINT }],
        frameNumber: 1,
      })
    );

    expect(state.sampleRois["1"]).toHaveLength(1);

    const stateAfterAnotherAdd = roiSlice(
      state,
      addSampleRoi({
        points: [{ ...DEFAULT_ROI_POINT }, { ...DEFAULT_ROI_POINT }],
        frameNumber: 1,
      })
    );

    expect(stateAfterAnotherAdd.sampleRois["1"]).toHaveLength(2);

    const stateAfterSetVisibility = roiSlice(
      state,
      setVisibleRoi({
        frameNumber: 1,
        sampleId: "1",
        newValue: false,
      })
    );

    Object.values(stateAfterSetVisibility.sampleRois["1"]).forEach((length) => {
      expect(length.visible).toBe(false);
    });
  });

  it("should handle setting the roi's fixed property", () => {
    const state = roiSlice(
      initialState,
      addSampleRoi({
        points: [{ ...DEFAULT_ROI_POINT }, { ...DEFAULT_ROI_POINT }],
        frameNumber: 1,
      })
    );

    expect(state.sampleRois["1"]).toHaveLength(1);

    const stateAfterSetFixed = roiSlice(
      state,
      setFixedRoi({
        frameNumber: 1,
        sampleId: "1",
        newValue: false,
      })
    );

    Object.values(stateAfterSetFixed.sampleRois["1"]).forEach((length) => {
      expect(length.fixed).toBe(false);
    });
  });
});
