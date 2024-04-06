import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import managerSlice, { computeVideo } from "./managerSlice";
import fascicleSlice from "../fascicle/fascicleSlice";
import roiSlice from "../roi/roiSlice";
import { COMPUTE_VIDEO_ENDPOINT } from "./managerModels";
import videoSlice from "../video/videoSlice";

vi.stubGlobal("fetch", vi.fn());

describe("managerSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        manager: managerSlice,
        fascicle: fascicleSlice,
        roi: roiSlice,
        video: videoSlice,
      },
      preloadedState: {
        video: {
          metadata: { duration: 120 },
        },
        fascicle: {
          sampleFascicleLengths: {},
        },
        roi: {
          sampleRois: {},
        },
      },
    });
    vi.resetAllMocks();
  });

  it("should handle computeVideo/pending", async () => {
    const result = store.dispatch(computeVideo());

    expect(store.getState().manager.loading).toBeTruthy();

    await result;
  });

  it("should handle computeVideo/fulfilled", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        computedFascicleLengths: { ["1"]: [] },
        computedRois: { ["1"]: [] },
      }),
    });

    await store.dispatch(computeVideo());

    const state = store.getState();

    expect(fetch).toHaveBeenCalled(COMPUTE_VIDEO_ENDPOINT, expect.anything());
    expect(state.manager.loading).toBeFalsy();
    expect(state.manager.error).toBeFalsy();
    expect(state.fascicle.computedFascicleLengths).toEqual({ ["1"]: [] });
    expect(state.roi.computedRois).toEqual({ ["1"]: [] });
  });

  it("should handle computeVideo/rejected due to network error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    await store.dispatch(computeVideo());

    const state = store.getState().manager;

    expect(fetch).toHaveBeenCalledWith(
      COMPUTE_VIDEO_ENDPOINT,
      expect.anything()
    );

    expect(state.loading).toBeFalsy();
    expect(state.error).toBeTruthy();
  });
});
