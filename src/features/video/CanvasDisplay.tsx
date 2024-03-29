import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { fromTimeToFrame } from "./videoUtils";
import { getRenderColor } from "../renderCommon/renderUtils";
import { drawFascicleLength, drawRoi } from "./videoService";
import { MarkMode, MarkPoint } from "./videoModels";
import { addMarkPoint, setMarkMode } from "./videoSlice";
import {
  AddSampleFascicleLengthPayload,
  addSampleFascicleLength,
} from "../fascicle/fascicleSlice";
import { FascicleLengthPoint } from "../fascicle/fascicleModels";
import { getDistanceBetweenPoints } from "../statistics/statisticsService";
import { addSampleRoi } from "../roi/roiSlice";
import { RoiPoint } from "../roi/roiModels";

const CanvasDisplay = () => {
  const { computedFascicleLengths, sampleFascicleLengths } = useAppSelector(
    (state) => state.fascicle
  );
  const { computedRois, sampleRois } = useAppSelector((state) => state.roi);
  const { metadata, mark } = useAppSelector((state) => state.video);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useAppDispatch();

  const { mode, points } = mark;

  useEffect(() => {
    if (!metadata) {
      return;
    }

    if (canvasRef.current === null) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (ctx === null) {
      return;
    }

    ctx.clearRect(0, 0, 1000, 1000);

    [computedRois, sampleRois].forEach((rois) => {
      rois[currentFrame]?.forEach(({ points, sampleId }) => {
        const color = getRenderColor(sampleId);
        drawRoi(ctx, points, color);
      });
    });

    [computedFascicleLengths, sampleFascicleLengths].forEach((lengths) => {
      lengths[currentFrame]?.forEach((length) => {
        const { point1, point2, sampleId } = length;
        const color = getRenderColor(sampleId);
        drawFascicleLength(ctx, point1, point2, color);
      });
    });
  }, [
    metadata,
    computedFascicleLengths,
    sampleFascicleLengths,
    computedRois,
    sampleRois,
  ]);

  useEffect(() => {
    if (!metadata) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) return;

    const handleCanvasClick = (event: MouseEvent) => {
      if (mode === MarkMode.DISABLED) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const point: MarkPoint = { x, y };

      const newPoints = [...points, point];

      if (mode === MarkMode.FASCICLE_LENGTH) {
        dispatch(addMarkPoint({ point }));

        if (newPoints.length === 2) {
          const lengthPoints = newPoints as FascicleLengthPoint[];

          const payload: AddSampleFascicleLengthPayload = {
            point1: lengthPoints[0],
            point2: lengthPoints[1],
            frameNumber: currentFrame,
          };

          dispatch(addSampleFascicleLength(payload));
          dispatch(setMarkMode({ mode: MarkMode.DISABLED }));
        }
      }

      if (mode === MarkMode.ROI) {
        if (newPoints.length <= 1) {
          dispatch(addMarkPoint({ point }));
        } else {
          const distance = getDistanceBetweenPoints(
            newPoints[0] as FascicleLengthPoint,
            newPoints[newPoints.length - 1] as FascicleLengthPoint
          );

          if (distance < 50) {
            const roiPoints = points as RoiPoint[];

            const payload = {
              points: roiPoints,
              frameNumber: currentFrame,
            };

            dispatch(addSampleRoi(payload));
            dispatch(setMarkMode({ mode: MarkMode.DISABLED }));
          } else {
            dispatch(addMarkPoint({ point }));
          }
        }
      }
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [mark, points]);

  if (!metadata) {
    return null;
  }

  const { currentTime } = metadata;
  const currentFrame = fromTimeToFrame(currentTime);

  return <canvas ref={canvasRef} width={600} height={600} />;
};

export default CanvasDisplay;
