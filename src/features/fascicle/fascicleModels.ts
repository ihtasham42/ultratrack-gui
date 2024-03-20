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

export type FascicleLengthChartDataItem = Record<string, number | string> 

export type FascicleLengthChartData = Array<FascicleLengthChartDataItem> 

export const fasicleLengthColors: Record<string, string> = {
    "1": "red",
    "2": "blue",
    "3": "green",
    "4": "purple",
    "5": "orange"
}