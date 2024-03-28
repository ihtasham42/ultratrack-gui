import { createServer } from "miragejs";
import {
  ComputeVideoPayload,
  ComputeVideoResponse,
} from "../manager/managerModels";
import {
  FascicleLength,
  FascicleLengthFrames,
  FascicleLengthWithFrameNumber,
} from "../fascicle/fascicleModels";
import { RoiFrames } from "../roi/roiModels";
import { getFlattenedRenderObjects } from "../renderCommon/renderUtils";

export function makeServer() {
  createServer({
    routes() {
      this.post(
        "/api/video/compute",
        async (_, request): Promise<ComputeVideoResponse> => {
          await new Promise((res) => setTimeout(res, 2000));

          const {
            sampleRois,
            sampleFascicleLengths,
            maxFrame,
          }: ComputeVideoPayload = JSON.parse(request.requestBody);

          const computedFascicleLengths = computeFascicleLengths(
            sampleFascicleLengths,
            maxFrame
          );

          const computedRois = computeRois(sampleRois, maxFrame);

          return {
            computedFascicleLengths,
            computedRois,
          };
        }
      );
    },
  });
}

const computeFascicleLengths = (
  sampleFascicleLengths: FascicleLengthFrames,
  maxFrame: number
): FascicleLengthFrames => {
  const computedFascicleLengths: FascicleLengthFrames = {};

  const flattenedLengths = getFlattenedRenderObjects(
    sampleFascicleLengths
  ) as FascicleLengthWithFrameNumber[];

  flattenedLengths.map(
    ({ point1, point2, sampleId, frameNumber: sampleFrameNumber }) => {
      const rx1 = Math.random() * 2 - 1;
      const ry1 = Math.random() * 2 - 1;
      const rx2 = Math.random() * 2 - 1;
      const ry2 = Math.random() * 2 - 1;

      const sp = 0.3;

      for (let frameNumber = 0; frameNumber <= maxFrame; frameNumber++) {
        if (!computedFascicleLengths[frameNumber]) {
          computedFascicleLengths[frameNumber] = [];
        }

        const dfn = sampleFrameNumber - frameNumber;

        const { x: x1, y: y1 } = point1;
        const { x: x2, y: y2 } = point2;

        const length: FascicleLength = {
          sampleId: sampleId,
          point1: {
            x: x1 + rx1 * dfn * sp,
            y: y1 + ry1 * dfn * sp,
          },
          point2: {
            x: x2 + rx2 * dfn * sp,
            y: y2 + ry2 * dfn * sp,
          },
        };

        computedFascicleLengths[frameNumber].push(length);
      }
    }
  );

  console.log(computeFascicleLengths);

  return computedFascicleLengths;
};

const computeRois = (sampleRois: RoiFrames, maxFrame: number): RoiFrames => {
  return {};
};
