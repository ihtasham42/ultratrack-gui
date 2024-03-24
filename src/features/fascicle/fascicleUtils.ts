import { FascicleLengthFrames, fasicleLengthColors } from "./fascicleModels";

export const getFascicleLengthColor = (sampleId: string): string => {
  return fasicleLengthColors[sampleId] || "white";
};

export const getSampleFascicleLengthIds = (
  lengthFrames: FascicleLengthFrames
): string[] => {
  const sampleIds = new Set<string>();

  Object.values(lengthFrames).forEach((lengthFrame) => {
    lengthFrame.forEach(({ sampleId }) => {
      sampleIds.add(sampleId);
    });
  });

  return Array.from(sampleIds);
};
