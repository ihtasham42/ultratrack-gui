import { FascicleLengthPoint } from "../fascicle/fascicleModels";
import { RoiPoint } from "../roi/roiModels";
import { LINE_WIDTH, MarkPoint, POINT_RADIUS } from "./videoModels";

export const drawFascicleLength = (
  ctx: CanvasRenderingContext2D,
  { x: x1, y: y1 }: FascicleLengthPoint,
  { x: x2, y: y2 }: FascicleLengthPoint,
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

export const drawMarkLine = (
  ctx: CanvasRenderingContext2D,
  { x: x1, y: y1 }: MarkPoint,
  { x: x2, y: y2 }: MarkPoint,
  color: string
) => {
  ctx.setLineDash([15, 10]);

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = LINE_WIDTH;
  ctx.stroke();
};

export const drawRoi = (
  ctx: CanvasRenderingContext2D,
  points: RoiPoint[],
  color: string
) => {
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
