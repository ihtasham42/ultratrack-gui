import { useEffect, useRef } from "react";
import { useAppSelector } from "../../common/hooks";
import { fromTimeToFrame } from "./videoUtils";
import { getFascicleLengthColor } from "../fascicle/fascicleUtils";

const FASCICLE_LENGTH_END_SQUARE_SIZE = 12;
const FASCICLE_LENGTH_LINE_WIDTH = 4;

const CanvasDisplay = () => {
  const { computedFascicleLengths, colorMapping } = useAppSelector(
    (state) => state.fascicle
  );
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

    const drawFascicleLength = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = FASCICLE_LENGTH_LINE_WIDTH;
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.fillRect(
        x1 - FASCICLE_LENGTH_END_SQUARE_SIZE / 2,
        y1 - FASCICLE_LENGTH_END_SQUARE_SIZE / 2,
        FASCICLE_LENGTH_END_SQUARE_SIZE,
        FASCICLE_LENGTH_END_SQUARE_SIZE
      );

      ctx.fillRect(
        x2 - FASCICLE_LENGTH_END_SQUARE_SIZE / 2,
        y2 - FASCICLE_LENGTH_END_SQUARE_SIZE / 2,
        FASCICLE_LENGTH_END_SQUARE_SIZE,
        FASCICLE_LENGTH_END_SQUARE_SIZE
      );
    };

    const fascicleLengthFrame = computedFascicleLengths[currentFrame];

    if (!fascicleLengthFrame) {
      return;
    }

    fascicleLengthFrame.forEach((fascicleLength) => {
      const { point1, point2, sampleId } = fascicleLength;
      const color = getFascicleLengthColor(sampleId);
      drawFascicleLength(point1.x, point1.y, point2.x, point2.y, color);
    });
  }, [metadata]);

  if (!metadata) {
    return null;
  }

  const { currentTime } = metadata;

  const currentFrame = fromTimeToFrame(currentTime);

  return <canvas ref={canvasRef} width={600} height={600} />;
};

export default CanvasDisplay;
