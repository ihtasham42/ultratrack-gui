import { describe, expect, it } from "vitest";
import { MarkMode, VideoPlaybackState } from "./videoModels";
import videoSlice, {
  addMarkPoint,
  clearMarkPoints,
  pauseVideo,
  playVideo,
  removeVideo,
  setMarkMode,
  stepBackward,
  stepForward,
  updateCurrentTime,
  uploadVideo,
} from "./videoSlice";
import { fromFrameToTime } from "./videoUtils";

const DEFAULT_METADATA = {
  duration: 120,
  currentTime: 0,
  playbackState: VideoPlaybackState.PAUSED,
  name: "Test Video",
};

describe("videoSlice", () => {
  const initialState = {
    source: undefined,
    metadata: undefined,
    mark: {
      mode: MarkMode.DISABLED,
      points: [],
    },
  };

  it("should handle playing a video", () => {
    const stateBefore = {
      ...initialState,
      metadata: {
        currentTime: 0,
        duration: 120,
        playbackState: VideoPlaybackState.PAUSED,
        name: "Test Video",
      },
    };

    const action = { type: playVideo.type };

    const state = videoSlice(stateBefore, action);

    expect(state.metadata?.playbackState).toEqual(VideoPlaybackState.PLAYING);
  });

  it("should handle pausing a video", () => {
    const stateBefore = {
      ...initialState,
      metadata: {
        currentTime: 0,
        duration: 120,
        playbackState: VideoPlaybackState.PLAYING,
        name: "Test Video",
      },
    };

    const action = { type: pauseVideo.type };

    const state = videoSlice(stateBefore, action);

    expect(state.metadata?.playbackState).toEqual(VideoPlaybackState.PAUSED);
  });

  it("should handle uploading a video", () => {
    const action = {
      type: uploadVideo.type,
      payload: { source: "video.mp4", duration: 120, name: "Test Video" },
    };

    const state = videoSlice(initialState, action);

    expect(state.source).toEqual("video.mp4");
    expect(state.metadata).toEqual({
      duration: 120,
      currentTime: 0,
      playbackState: VideoPlaybackState.PAUSED,
      name: "Test Video",
    });
  });

  it("should handle adding a mark point", () => {
    const newMarkPoint = { x: 0, y: 0 };

    const action = {
      type: addMarkPoint.type,
      payload: { point: newMarkPoint },
    };

    const state = videoSlice(initialState, action);

    expect(state.mark.points).toHaveLength(1);
    expect(state.mark.points[0]).toEqual(newMarkPoint);
  });

  it("should handle clearing all mark points", () => {
    const stateBefore = {
      ...initialState,
      mark: {
        mode: MarkMode.DISABLED,
        points: [{ x: 0, y: 0 }],
      },
    };

    const action = { type: clearMarkPoints.type };

    const state = videoSlice(stateBefore, action);

    expect(state.mark.points).toHaveLength(0);
  });

  it("should handle setting mark mode", () => {
    const stateBefore = {
      ...initialState,
      mark: {
        mode: MarkMode.DISABLED,
        points: [{ x: 0, y: 0 }],
      },
    };

    const action = {
      type: setMarkMode.type,
      payload: { mode: MarkMode.FASCICLE_LENGTH },
    };

    const state = videoSlice(stateBefore, action);

    expect(state.mark.mode).toBe(MarkMode.FASCICLE_LENGTH);
    expect(state.mark.points).toHaveLength(0);
  });

  it("should handle removing the video", () => {
    const stateBefore = {
      ...initialState,
      source: "video.mp4",
      metadata: { ...DEFAULT_METADATA },
    };

    const action = { type: removeVideo.type };

    const state = videoSlice(stateBefore, action);

    expect(state.source).toBeUndefined();
    expect(state.metadata).toBeUndefined();
  });

  it("should handle updating the current time", () => {
    const stateBefore = {
      ...initialState,
      metadata: { ...DEFAULT_METADATA },
    };

    const action = { type: updateCurrentTime.type, payload: { time: 30 } };

    const state = videoSlice(stateBefore, action);

    expect(state.metadata.currentTime).toBe(30);
  });

  it("should handle jumping to a time", () => {
    const stateBefore = {
      ...initialState,
      metadata: { ...DEFAULT_METADATA },
    };

    const action = { type: updateCurrentTime.type, payload: { time: 50 } };

    const state = videoSlice(stateBefore, action);

    expect(state.metadata.currentTime).toBe(50);
  });

  it("should handle stepping a frame forward", () => {
    const stateBefore = {
      ...initialState,
      metadata: { ...DEFAULT_METADATA, currentTime: 5 },
    };

    const stateAfterStepForward = videoSlice(stateBefore, stepForward());

    expect(stateAfterStepForward.metadata.currentTime).toEqual(
      5 + fromFrameToTime(1)
    );
  });

  it("should handle stepping a frame backward", () => {
    const stateBefore = {
      ...initialState,
      metadata: { ...DEFAULT_METADATA, currentTime: 5 },
    };

    const stateAfterStepBackward = videoSlice(stateBefore, stepBackward());

    expect(stateAfterStepBackward.metadata.currentTime).toEqual(
      5 - fromFrameToTime(1)
    );
  });
});
