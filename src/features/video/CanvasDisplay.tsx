import { useEffect, useRef } from "react";
import { useAppSelector } from "../../common/hooks";
import { fromTimeToFrame } from "./videoUtils";

const CanvasDisplay = () => {
  const { computedFascicleLengths } = useAppSelector((state) => state.fascicle);
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
      y2: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.stroke();

      const squareSize = 6;

      ctx.fillStyle = "red";
      ctx.fillRect(
        x1 - squareSize / 2,
        y1 - squareSize / 2,
        squareSize,
        squareSize
      );

      ctx.fillRect(
        x2 - squareSize / 2,
        y2 - squareSize / 2,
        squareSize,
        squareSize
      );
    };

    const fascicleLengthFrame = computedFascicleLengths[currentFrame];

    if (!fascicleLengthFrame) {
      return;
    }

    fascicleLengthFrame.forEach((fascicleLength) => {
      const { point1, point2 } = fascicleLength;
      console.log("draw at", point1, point2);
      drawFascicleLength(point1.x, point1.y, point2.x, point2.y);
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
