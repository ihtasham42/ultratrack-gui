import { describe, expect, it } from "vitest";
import fascicleSlice, {
  addSampleFascicleLength,
  clearComputedFascicleLengths,
  clearSampleFascicleLengths,
  removeSampleFascicleLength,
  setComputedFascicleLengths,
  setVisibleFascicleLength,
} from "./fascicleSlice";

const DEFAULT_FASCICLE_POINT = {
  x: 0,
  y: 0,
};

const DEFAULT_FASCICLE_LENGTH = {
  sampleId: "1",
  point1: { ...DEFAULT_FASCICLE_POINT },
  point2: { ...DEFAULT_FASCICLE_POINT },
  visible: true,
};

describe("fascicleSlice", () => {
  const initialState = {
    computedFascicleLengths: {},
    sampleFascicleLengths: {},
  };

  it("should handle setting the computed fascicle lengths", () => {
    const computedFascicleLengths = {
      ["1"]: [{ ...DEFAULT_FASCICLE_LENGTH }],
    };

    const state = fascicleSlice(
      initialState,
      setComputedFascicleLengths({ computedFascicleLengths })
    );

    expect(Object.keys(state.computedFascicleLengths)).toHaveLength(1);
    expect(state.computedFascicleLengths).toBe(computedFascicleLengths);
  });

  it("should handle removing a sample fascicle length", () => {
    const stateBefore = {
      ...initialState,
      sampleFascicleLengths: {
        ["1"]: [{ ...DEFAULT_FASCICLE_LENGTH, sampleId: "1" }],
      },
    };

    const state = fascicleSlice(
      stateBefore,
      removeSampleFascicleLength({ sampleId: "1" })
    );

    Object.values(state.sampleFascicleLengths).forEach((frame) => {
      expect(frame.find(({ sampleId }) => sampleId === "1")).toBeUndefined();
    });
  });

  it("should handle clearing the sample fascicle lengths", () => {
    const stateBefore = {
      ...initialState,
      sampleFascicleLengths: {
        ["1"]: [{ ...DEFAULT_FASCICLE_LENGTH }],
      },
    };

    const state = fascicleSlice(stateBefore, clearSampleFascicleLengths());

    expect(state.sampleFascicleLengths).toStrictEqual({});
  });

  it("should handle clearing the computed fascicle lengths", () => {
    const stateBefore = {
      ...initialState,
      computedFascicleLengths: {
        ["1"]: [{ ...DEFAULT_FASCICLE_LENGTH }],
      },
    };

    const state = fascicleSlice(stateBefore, clearComputedFascicleLengths());

    expect(state.computedFascicleLengths).toStrictEqual({});
  });

  it("should handle adding the sample fascicle length", () => {
    const state = fascicleSlice(
      initialState,
      addSampleFascicleLength({
        point1: { ...DEFAULT_FASCICLE_POINT },
        point2: { ...DEFAULT_FASCICLE_POINT },
        frameNumber: 1,
      })
    );

    expect(state.sampleFascicleLengths["1"]).toHaveLength(1);

    const stateAfterAnotherAdd = fascicleSlice(
      state,
      addSampleFascicleLength({
        point1: { ...DEFAULT_FASCICLE_POINT },
        point2: { ...DEFAULT_FASCICLE_POINT },
        frameNumber: 1,
      })
    );

    expect(stateAfterAnotherAdd.sampleFascicleLengths["1"]).toHaveLength(2);
  });

  it("should handle setting the fascicle length's visiblity", () => {
    const state = fascicleSlice(
      initialState,
      addSampleFascicleLength({
        point1: { ...DEFAULT_FASCICLE_POINT },
        point2: { ...DEFAULT_FASCICLE_POINT },
        frameNumber: 1,
      })
    );

    expect(state.sampleFascicleLengths["1"]).toHaveLength(1);

    const stateAfterAnotherAdd = fascicleSlice(
      state,
      addSampleFascicleLength({
        point1: { ...DEFAULT_FASCICLE_POINT },
        point2: { ...DEFAULT_FASCICLE_POINT },
        frameNumber: 1,
      })
    );

    expect(stateAfterAnotherAdd.sampleFascicleLengths["1"]).toHaveLength(2);

    const stateAfterSetVisibility = fascicleSlice(
      state,
      setVisibleFascicleLength({
        frameNumber: 1,
        sampleId: "1",
        newValue: false,
      })
    );

    Object.values(stateAfterSetVisibility.sampleFascicleLengths["1"]).forEach(
      (length) => {
        expect(length.visible).toBe(false);
      }
    );
  });
});
