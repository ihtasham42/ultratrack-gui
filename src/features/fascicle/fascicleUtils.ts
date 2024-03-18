import { fasicleLengthColors } from "./fascicleModels"

export const getFascicleLengthColor = (sampleId: string): string =>  {
    return fasicleLengthColors[sampleId] || "white"  
}