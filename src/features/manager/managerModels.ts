import { FascicleLengthFrames } from "../fascicle/fascicleModels";
import { RoiFrames } from "../roi/roiModels";

export interface ComputeVideoResponse {
  computedFascicleLengths: FascicleLengthFrames;
  computedRois: RoiFrames;
}

export interface ComputeVideoPayload {
  sampleFascicleLengths: FascicleLengthFrames;
  sampleRois: RoiFrames;
  maxFrame: number;
}

export const COMPUTE_VIDEO_ENDPOINT = "/api/video/compute";
