import { TechniqueType } from "./techniqueModels"

interface TechniqueState {
    selectedTechnique: TechniqueType

}

const initialState: TechniqueState = {
    selectedTechnique: TechniqueType.TECHNIQUE_1
}