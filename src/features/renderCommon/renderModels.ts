import {
  FascicleLength,
  FascicleLengthFrames,
  FascicleLengthWithFrameNumber,
} from "../fascicle/fascicleModels";
import { Roi, RoiFrames, RoiWithFrameNumber } from "../roi/roiModels";

export const renderColors: Record<string, string> = {
  "1": "red",
  "2": "blue",
  "3": "green",
  "4": "purple",
  "5": "orange",
};

export type FlattenedResult =
  | FascicleLengthWithFrameNumber
  | RoiWithFrameNumber;

export type RenderFrames = FascicleLengthFrames | RoiFrames;

export type RenderObject = FascicleLength | Roi;
