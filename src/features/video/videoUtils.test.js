import { describe, it, expect } from "vitest";
import { fromFrameToTime, fromTimeToFrame } from "./videoUtils";
import { FRAME_RATE } from "./videoModels";

describe("Time-Frame conversion utilities", () => {
  describe("fromFrameToTime", () => {
    it("converts frames to time correctly", () => {
      const frames = 60;
      const expectedTime = frames / FRAME_RATE;
      expect(fromFrameToTime(frames)).toBe(expectedTime);
    });

    it("handles zero frames", () => {
      expect(fromFrameToTime(0)).toBe(0);
    });

    it("handles non-integer frames", () => {
      const frames = 45.5;
      const expectedTime = frames / FRAME_RATE;
      expect(fromFrameToTime(frames)).toBeCloseTo(expectedTime, 5);
    });
  });

  describe("fromTimeToFrame", () => {
    it("converts time to frames correctly", () => {
      const seconds = 1; // 1 second
      const expectedFrames = Math.ceil(seconds * FRAME_RATE);
      expect(fromTimeToFrame(seconds)).toBe(expectedFrames);
    });

    it("rounds up to the nearest frame", () => {
      const seconds = 1.1;
      const expectedFrames = Math.ceil(seconds * FRAME_RATE);
      expect(fromTimeToFrame(seconds)).toBe(expectedFrames);
    });

    it("handles zero seconds", () => {
      expect(fromTimeToFrame(0)).toBe(0);
    });

    it("handles negative seconds correctly", () => {
      const negativeSeconds = -1;

      const expectedFrames = Math.ceil(negativeSeconds * FRAME_RATE);
      expect(fromTimeToFrame(negativeSeconds)).toBe(expectedFrames);
    });
  });
});
