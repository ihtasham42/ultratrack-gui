export interface FascicleLength {
    sampleId: string
    point1: FascicleLengthPoint
    point2: FascicleLengthPoint
}

export interface FascicleLengthPoint {
    x: number;
    y: number;
}

export type FascicleLengthFrame = FascicleLength[]

export type FascicleLengthFrames = Record<number, FascicleLengthFrame>