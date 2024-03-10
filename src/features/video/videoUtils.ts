import { FRAME_RATE } from "./videoModels"

export const fromFrameToTime = (frame: number) => {
    return frame / FRAME_RATE
}

export const fromTimeToFrame = (seconds: number) => {
    return Math.ceil(seconds * FRAME_RATE)
}