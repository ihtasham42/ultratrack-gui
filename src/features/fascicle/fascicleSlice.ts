import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { FascicleLengthFrame, FascicleLengthFrames} from "./fascicleModels"



interface FascicleState {
    computedFascicleLengths: FascicleLengthFrames
    sampleFasicleLengths: FascicleLengthFrame
}

interface SetComputedFascicleLengthsPayload {
    computedFascicleLengths: FascicleLengthFrames
}

const initialState: FascicleState = {
    computedFascicleLengths: {
        1: [
            {
                sampleId: "1",
                point1: {x: 200, y: 300},
                point2: {x: 400, y: 500}
            }
        ]
    },
    sampleFasicleLengths: []
}

export const fascicleSlice = createSlice({
    name: "fascicle",
    initialState,
    reducers: {
        setComputedFascicleLengths: (state, action: PayloadAction<SetComputedFascicleLengthsPayload>) => {
            const {computedFascicleLengths} = action.payload
            
            state.computedFascicleLengths = computedFascicleLengths
        }
    }
})