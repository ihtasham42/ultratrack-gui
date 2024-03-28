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

export const getFirstAvailableSampleId = (
  renderFrames: RenderFrames
): string => {
  let sampleId = 1;

  const flattenedRenderObjects = getFlattenedRenderObjects(renderFrames);

  const sampleIdsInUse = new Set(
    flattenedRenderObjects.map(({ sampleId }) => sampleId)
  );

  while (sampleIdsInUse.has(sampleId.toString())) {
    sampleId += 1;
  }

  return sampleId.toString();
};
