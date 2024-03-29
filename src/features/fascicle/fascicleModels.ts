export interface FascicleLength {
  sampleId: string;
  point1: FascicleLengthPoint;
  point2: FascicleLengthPoint;
  visible?: boolean;
}

export interface FascicleLengthWithFrameNumber extends FascicleLength {
  frameNumber: number;
}

export interface FascicleLengthPoint {
  x: number;
  y: number;
}

export type FascicleLengthFrame = FascicleLength[];

export type FascicleLengthFrames = Record<string, FascicleLengthFrame>;

export type FascicleLengthChartDataItem = Record<string, number | string>;

export type FascicleLengthChartData = Array<FascicleLengthChartDataItem>;
