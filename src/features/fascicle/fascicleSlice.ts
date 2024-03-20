import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {  FascicleLengthFrame, FascicleLengthFrames} from "./fascicleModels"



interface FascicleState {
    computedFascicleLengths: FascicleLengthFrames
    sampleFasicleLengths: FascicleLengthFrame
}

interface SetComputedFascicleLengthsPayload {
    computedFascicleLengths: FascicleLengthFrames
}

const mockComputed: FascicleLengthFrames = {}

for (let i = 0; i <= 350; i++) {
    const frame = [
        {
            sampleId: "1",
            point1: {x: 100 + i * 0.5, y: 300 + i * 1.75},
            point2: {x: 500, y: 500}
        },
        {
            sampleId: "2",
            point1: {x: 50 + i * 0.25, y: 250 + i * 1.5},
            point2: {x: 450, y: 475}
        },
        {
            sampleId: "3",
            point1: {x: 100 + i * 0.5, y: 225 + i * 1.25},
            point2: {x: 400, y: 425}
        }
    ]

    mockComputed[i] = frame 
}

const initialState: FascicleState = {
    // computedFascicleLengths: {
    //     1: [
    //         {
    //             sampleId: "1",
    //             point1: {x: 200, y: 300},
    //             point2: {x: 400, y: 500}
    //         },
    //         {
    //             sampleId: "2",
    //             point1: {x: 200, y: 300},
    //             point2: {x: 400, y: 500}
    //         },
    //         {
    //             sampleId: "3",
    //             point1: {x: 200, y: 300},
    //             point2: {x: 400, y: 500}
    //         }
    //     ]
    // },
    computedFascicleLengths: mockComputed,
    sampleFasicleLengths: [
            {
                sampleId: "1",
                point1: {x: 200, y: 300},
                point2: {x: 400, y: 500}
            },
            {
                sampleId: "2",
                point1: {x: 200, y: 300},
                point2: {x: 400, y: 500}
            },
            {
                sampleId: "3",
                point1: {x: 200, y: 300},
                point2: {x: 400, y: 500}
            }
    ],
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

export const {setComputedFascicleLengths} = fascicleSlice.actions

export default fascicleSlice.reducer