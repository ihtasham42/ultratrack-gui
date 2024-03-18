export enum VideoPlaybackState {
    PLAYING,
    PAUSED
}

export interface VideoMetadata {
    duration: number;
    currentTime: number;
    playbackState: VideoPlaybackState;
    name: string;
  }

export const FRAME_RATE = 30