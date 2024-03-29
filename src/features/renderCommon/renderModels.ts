import {
  FascicleLength,
  FascicleLengthFrames,
  FascicleLengthWithFrameNumber,
} from "../fascicle/fascicleModels";
import { Roi, RoiFrames, RoiWithFrameNumber } from "../roi/roiModels";

export const renderColors: Record<string, string> = {
  "1": "red",
  "2": "dodgerblue",
  "3": "magenta",
  "4": "mediumseagreen",
  "5": "cyan",
  "6": "lawngreen",
};

export type FlattenedResult =
  | FascicleLengthWithFrameNumber
  | RoiWithFrameNumber;

export type RenderFrames = FascicleLengthFrames | RoiFrames;

export type RenderObject = FascicleLength | Roi;
