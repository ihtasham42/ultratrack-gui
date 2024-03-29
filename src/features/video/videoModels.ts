export enum VideoPlaybackState {
  PLAYING,
  PAUSED,
}

export interface VideoMetadata {
  duration: number;
  currentTime: number;
  playbackState: VideoPlaybackState;
  name: string;
}

export enum MarkMode {
  DISABLED,
  FASCICLE_LENGTH,
  ROI,
}

export interface MarkPoint {
  x: number;
  y: number;
}

export const POINT_RADIUS = 6;
export const LINE_WIDTH = 4;

export const FRAME_RATE = 30;
