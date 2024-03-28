import {
  FascicleLength,
  FascicleLengthFrames,
  FascicleLengthWithFrameNumber,
} from "../fascicle/fascicleModels";
import { Roi, RoiFrames, RoiWithFrameNumber } from "../roi/roiModels";

export const renderColors: Record<string, string> = {
  "1": "red",
  "2": "blue",
  "3": "lime",
  "4": "purple",
  "5": "cyan",
  "6": "pink",
  "7": "green",
};

export type FlattenedResult =
  | FascicleLengthWithFrameNumber
  | RoiWithFrameNumber;

export type RenderFrames = FascicleLengthFrames | RoiFrames;

export type RenderObject = FascicleLength | Roi;
