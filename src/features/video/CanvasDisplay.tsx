import { useEffect, useRef } from "react";
import { useAppSelector } from "../../common/hooks";
import { fromTimeToFrame } from "./videoUtils";
import { getRenderColor } from "../renderCommon/renderUtils";
import { RoiPoint } from "../roi/roiModels";

const POINT_RADIUS = 6;
const LINE_WIDTH = 4;

const CanvasDisplay = () => {
  const { computedFascicleLengths, sampleFascicleLengths } = useAppSelector(
    (state) => state.fascicle
  );
  const { computedRois, sampleRois } = useAppSelector((state) => state.roi);
  const { metadata } = useAppSelector((state) => state.video);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const drawRoi = (points: RoiPoint[], color: string) => {
      if (points.length < 2) return;

      ctx.setLineDash([15, 10]);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach((point, index) => {
        if (index > 0) {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.lineTo(points[0].x, points[0].y);
      ctx.strokeStyle = color;
      ctx.lineWidth = LINE_WIDTH;
      ctx.stroke();
      ctx.closePath();

      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, POINT_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      });
    };

    const drawFascicleLength = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string
    ) => {
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = LINE_WIDTH;
      ctx.stroke();

      [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
      ].forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, POINT_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      });
    };

    [computedRois, sampleRois].forEach((rois) => {
      rois[currentFrame]?.forEach(({ points, sampleId }) => {
        const color = getRenderColor(sampleId);
        drawRoi(points, color);
      });
    });

    [computedFascicleLengths, sampleFascicleLengths].forEach((lengths) => {
      lengths[currentFrame]?.forEach((length) => {
        const { point1, point2, sampleId } = length;
        const color = getRenderColor(sampleId);
        drawFascicleLength(point1.x, point1.y, point2.x, point2.y, color);
      });
    });
  }, [metadata, computedFascicleLengths]);

  if (!metadata) {
    return null;
  }

  const { currentTime } = metadata;

  const currentFrame = fromTimeToFrame(currentTime);

  return <canvas ref={canvasRef} width={600} height={600} />;
};

export default CanvasDisplay;
