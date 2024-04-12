import { describe, it, expect } from "vitest";
import {
  getRenderColor,
  getFlattenedRenderObjects,
  getFirstAvailableSampleId,
} from "./renderUtils";

describe("Render Utilities Tests", () => {
  describe("getRenderColor", () => {
    it("returns the correct color for a known sample ID", () => {
      const sampleId = "1";
      expect(getRenderColor(sampleId)).toBe("red");
    });

    it("returns default color 'orange' for an unknown sample ID", () => {
      const unknownSampleId = "unknownSample";
      expect(getRenderColor(unknownSampleId)).toBe("orange");
    });
  });

  describe("getFlattenedRenderObjects", () => {
    it("flattens render frames correctly", () => {
      const frames = {
        1: [{ sampleId: "1", data: "data1" }],
        2: [
          { sampleId: "2", data: "data2" },
          { sampleId: "3", data: "data3" },
        ],
      };
      const expected = [
        { sampleId: "1", data: "data1", frameNumber: 1 },
        { sampleId: "2", data: "data2", frameNumber: 2 },
        { sampleId: "3", data: "data3", frameNumber: 2 },
      ];
      expect(getFlattenedRenderObjects(frames)).toEqual(expected);
    });
  });

  describe("getFirstAvailableSampleId", () => {
    it("returns the first non-used sample ID in a sequence", () => {
      const frames = {
        1: [{ sampleId: "1", data: "data1" }],
        2: [{ sampleId: "2", data: "data2" }],
      };
      expect(getFirstAvailableSampleId(frames)).toBe("3");
    });

    it("skips used IDs and finds the first available", () => {
      const frames = {
        1: [{ sampleId: "1", data: "data1" }],
        2: [{ sampleId: "2", data: "data2" }],
        3: [{ sampleId: "3", data: "data3" }],
      };
      expect(getFirstAvailableSampleId(frames)).toBe("4");
    });
  });
});
