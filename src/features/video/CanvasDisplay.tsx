import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { fromTimeToFrame } from "./videoUtils";
import {
  getFirstAvailableSampleId,
  getFlattenedRenderObjects,
  getRenderColor,
} from "../renderCommon/renderUtils";
import { drawFascicleLength, drawMarkLine, drawRoi } from "./videoService";
import { MarkMode, MarkPoint } from "./videoModels";
import { addMarkPoint, clearMarkPoints } from "./videoSlice";
import {
  AddSampleFascicleLengthPayload,
  addSampleFascicleLength,
} from "../fascicle/fascicleSlice";
import {
  FascicleLengthPoint,
  FascicleLengthWithFrameNumber,
} from "../fascicle/fascicleModels";
import { getDistanceBetweenPoints } from "../statistics/statisticsService";
import { addSampleRoi } from "../roi/roiSlice";
import { RoiPoint, RoiWithFrameNumber } from "../roi/roiModels";
import { Box } from "@mantine/core";

const CanvasDisplay = () => {
  const { computedFascicleLengths, sampleFascicleLengths } = useAppSelector(
    (state) => state.fascicle
  );
  const { computedRois, sampleRois } = useAppSelector((state) => state.roi);
  const { metadata, mark } = useAppSelector((state) => state.video);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const markCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentMousePos, setCurrentMousePos] = useState<
    MarkPoint | undefined
  >();
  const dispatch = useAppDispatch();

  const { mode, points } = mark;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (mode === MarkMode.DISABLED) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setCurrentMousePos({ x, y });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mode, points]);

  useEffect(() => {
    const canvas = markCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (points.length > 0 && currentMousePos) {
      const mouseMarkPoint: MarkPoint = currentMousePos;

      let sampleId = "1";

      if (mode === MarkMode.FASCICLE_LENGTH) {
        sampleId = getFirstAvailableSampleId(sampleFascicleLengths);
      } else if (mode === MarkMode.ROI) {
        sampleId = getFirstAvailableSampleId(sampleRois);
      }

      const color = getRenderColor(sampleId);

      for (let i = 1; i < points.length; i++) {
        const currentPoint = points[i] as MarkPoint;
        const previousPoint = points[i - 1] as MarkPoint;

        drawMarkLine(ctx, currentPoint, previousPoint, color);
      }

      drawMarkLine(
        ctx,
        points[points.length - 1] as MarkPoint,
        mouseMarkPoint,
        color
      );
    }
  }, [currentMousePos, mode, points]);

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
        if (
          rois === sampleRois &&
          computedRois[currentFrame]?.find((roi) => roi.sampleId === sampleId)
        ) {
          return;
        }

        if (
          flattenedRois.find(
            (roi) => roi.sampleId === sampleId && roi.visible === false
          )
        ) {
          return;
        }

        const color = getRenderColor(sampleId);
        drawRoi(ctx, points, color);
      });
    });

    [computedFascicleLengths, sampleFascicleLengths].forEach((lengths) => {
      lengths[currentFrame]?.forEach(({ point1, point2, sampleId }) => {
        if (
          lengths === sampleFascicleLengths &&
          computedFascicleLengths[currentFrame]?.find(
            (length) => length.sampleId === sampleId
          )
        ) {
          return;
        }

        if (
          flattenedLengths.find(
            (length) => length.sampleId === sampleId && length.visible === false
          )
        ) {
          return;
        }

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
          dispatch(clearMarkPoints());
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
            dispatch(clearMarkPoints());
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

  const flattenedLengths = getFlattenedRenderObjects(
    sampleFascicleLengths
  ) as FascicleLengthWithFrameNumber[];

  const flattenedRois = getFlattenedRenderObjects(
    sampleRois
  ) as RoiWithFrameNumber[];

  return (
    <Box style={{ position: "relative" }}>
      <canvas
        ref={markCanvasRef}
        width={600}
        height={600}
        style={{ position: "absolute", zIndex: 1 }}
      />
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        style={{ position: "absolute", zIndex: 2 }}
      />
    </Box>
  );
};

export default CanvasDisplay;
