import {
  FlattenedResult,
  RenderFrames,
  RenderObject,
  renderColors,
} from "./renderModels";

export const getRenderColor = (sampleId: string): string => {
  return renderColors[sampleId] || "white";
};

export const getFlattenedRenderObjects = (
  frames: RenderFrames
): FlattenedResult[] => {
  const flattenedResult: FlattenedResult[] = [];

  Object.entries(frames).forEach(([frameNumber, frame]) => {
    frame.forEach((renderObject: RenderObject) => {
      const newLength: FlattenedResult = {
        ...renderObject,
        frameNumber: parseInt(frameNumber),
      };
      flattenedResult.push(newLength);
    });
  });

  return flattenedResult;
};
