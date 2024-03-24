import {
  FascicleLength,
  FascicleLengthFrames,
  FascicleLengthWithFrameNumber,
  fascicleLengthColors,
} from "./fascicleModels";

export const getFascicleLengthColor = (sampleId: string): string => {
  return fascicleLengthColors[sampleId] || "white";
};

export const getFlattenedSampleFascicleLengths = (
  lengthFrames: FascicleLengthFrames
): FascicleLengthWithFrameNumber[] => {
  const sampleLengths: FascicleLengthWithFrameNumber[] = [];

  Object.entries(lengthFrames).forEach(([frameNumber, lengthFrame]) => {
    lengthFrame.forEach((length) => {
      const newLength: FascicleLengthWithFrameNumber = {
        ...length,
        frameNumber: parseInt(frameNumber),
      };
      sampleLengths.push(newLength);
    });
  });

  return sampleLengths;
};
