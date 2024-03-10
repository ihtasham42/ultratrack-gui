import { FRAME_RATE } from "./videoModels"

export const fromFrameToTime = (frame: number) => {
    return Math.ceil(frame / FRAME_RATE)
}

export const fromTimeToFrame = (seconds: number) => {
    return Math.ceil(seconds * FRAME_RATE)
}