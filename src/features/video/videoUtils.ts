import { FRAME_RATE } from "./videoModels"

export const fromFrameToSeconds = (frame: number) => {
    return frame / FRAME_RATE
}

export const fromSecondsToFrame = (seconds: number) => {
    return seconds * FRAME_RATE
}