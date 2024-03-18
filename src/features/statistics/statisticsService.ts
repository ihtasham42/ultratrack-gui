import {  FascicleLengthChartData, FascicleLengthChartDataItem, FascicleLengthFrames, FascicleLengthPoint } from "../fascicle/fascicleModels"

export const toFascicleLengthChartData = (frames: FascicleLengthFrames): FascicleLengthChartData => {
    return Object.entries(frames).map(([frameNumber, frame]) => {
        const chartDataItem: FascicleLengthChartDataItem = {
            frame: parseInt(frameNumber)
        }
        
        frame.forEach(({sampleId, point1, point2}) => {chartDataItem[sampleId] = getDistanceBetweenPoints(point1, point2)})

        return chartDataItem
    })
}

const getDistanceBetweenPoints = (point1: FascicleLengthPoint, point2: FascicleLengthPoint) => {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
}