export interface Roi {
  sampleId: string;
  points: RoiPoint[];
  fixed: boolean;
}

export interface RoiWithFrameNumber extends Roi {
  frameNumber: number;
}

export interface RoiPoint {
  x: number;
  y: number;
}

export type RoiFrame = Roi[];

export type RoiFrames = Record<string, RoiFrame>;

export type RoiChartDataItem = Record<string, number | string>;

export type RoiChartData = Array<RoiChartDataItem>;
