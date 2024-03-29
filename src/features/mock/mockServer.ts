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
import { Roi, RoiFrames, RoiWithFrameNumber } from "../roi/roiModels";
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
      const [rx1, ry1, rx2, ry2] = Array.from(
        { length: 4 },
        () => (Math.random() - 0.5) * 2
      );

      const sp = 0.3;

      for (let frameNumber = 0; frameNumber <= maxFrame; frameNumber++) {
        if (!computedFascicleLengths[frameNumber]) {
          computedFascicleLengths[frameNumber] = [];
        }

        const dfn = sampleFrameNumber - frameNumber;

        const { x: x1, y: y1 } = point1;
        const { x: x2, y: y2 } = point2;

        const [ox1, oy1, ox2, oy2] = Array.from(
          { length: 4 },
          () => (Math.random() - 0.5) * 10
        );

        const length: FascicleLength = {
          sampleId: sampleId,
          point1: {
            x: x1 + rx1 * dfn * sp + ox1,
            y: y1 + ry1 * dfn * sp + oy1,
          },
          point2: {
            x: x2 + rx2 * dfn * sp + ox2,
            y: y2 + ry2 * dfn * sp + oy2,
          },
        };

        computedFascicleLengths[frameNumber].push(length);
      }
    }
  );

  return computedFascicleLengths;
};

const computeRois = (sampleRois: RoiFrames, maxFrame: number): RoiFrames => {
  const computedRois: RoiFrames = {};

  const flattenedRois = getFlattenedRenderObjects(
    sampleRois
  ) as RoiWithFrameNumber[];

  const sp = 0.3;

  flattenedRois.map(
    ({
      points: samplePoints,
      sampleId,
      fixed,
      frameNumber: sampleFrameNumber,
    }) => {
      const rfs = samplePoints.map(() => ({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
      }));

      for (let frameNumber = 0; frameNumber <= maxFrame; frameNumber++) {
        if (!computedRois[frameNumber]) {
          computedRois[frameNumber] = [];
        }

        const dfn = sampleFrameNumber - frameNumber;

        let points = [...samplePoints];

        if (!fixed) {
          points = points.map(({ x, y }, i) => {
            const rf = rfs[i];

            return {
              x: x + rf.x * dfn * sp,
              y: y + rf.y * dfn * sp,
            };
          });
        }

        const roi: Roi = {
          points,
          sampleId,
          fixed,
        };

        computedRois[frameNumber].push(roi);
      }
    }
  );

  return computedRois;
};
