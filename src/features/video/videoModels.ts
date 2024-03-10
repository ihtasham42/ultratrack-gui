export enum VideoPlaybackState {
    PLAYING,
    PAUSED
}

export interface VideoMetadata {
    duration: number;
    currentTime: number;
    playbackState: VideoPlaybackState;
  }

export const FRAME_RATE = 30