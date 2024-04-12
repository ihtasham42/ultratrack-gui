import { describe, it, expect, vi, beforeEach } from "vitest";
import { drawFascicleLength, drawMarkLine, drawRoi } from "./videoService";
import { LINE_WIDTH } from "./videoModels";

describe("Canvas drawing functions", () => {
  let ctxMock;

  beforeEach(() => {
    ctxMock = {
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      arc: vi.fn(),
      stroke: vi.fn(),
      fill: vi.fn(),
      setLineDash: vi.fn(),
      closePath: vi.fn(),
    };
  });

  it("draws a fascicle length correctly", () => {
    const point1 = { x: 10, y: 20 };
    const point2 = { x: 30, y: 40 };
    const color = "red";

    drawFascicleLength(ctxMock, point1, point2, color);

    expect(ctxMock.beginPath).toHaveBeenCalledTimes(3);
    expect(ctxMock.moveTo).toHaveBeenCalledWith(10, 20);
    expect(ctxMock.lineTo).toHaveBeenCalledWith(30, 40);
    expect(ctxMock.arc).toHaveBeenCalledTimes(2);
    expect(ctxMock.stroke).toHaveBeenCalled();
    expect(ctxMock.fill).toHaveBeenCalledTimes(2);
    expect(ctxMock.setLineDash).toHaveBeenCalledWith([]);
    expect(ctxMock.strokeStyle).toBe(color);
    expect(ctxMock.fillStyle).toBe(color);
    expect(ctxMock.lineWidth).toBe(LINE_WIDTH);
  });

  it("draws a mark line correctly", () => {
    const point1 = { x: 5, y: 5 };
    const point2 = { x: 15, y: 15 };
    const color = "blue";

    drawMarkLine(ctxMock, point1, point2, color);

    expect(ctxMock.beginPath).toHaveBeenCalled();
    expect(ctxMock.moveTo).toHaveBeenCalledWith(5, 5);
    expect(ctxMock.lineTo).toHaveBeenCalledWith(15, 15);
    expect(ctxMock.stroke).toHaveBeenCalled();
    expect(ctxMock.setLineDash).toHaveBeenCalledWith([15, 10]);
    expect(ctxMock.strokeStyle).toBe(color);
    expect(ctxMock.lineWidth).toBe(LINE_WIDTH);
  });

  it("draws a ROI correctly", () => {
    const points = [
      { x: 100, y: 100 },
      { x: 150, y: 150 },
      { x: 100, y: 150 },
    ];
    const color = "green";

    drawRoi(ctxMock, points, color);

    expect(ctxMock.setLineDash).toHaveBeenCalledWith([15, 10]);
    expect(ctxMock.moveTo).toHaveBeenCalledWith(100, 100);
    expect(ctxMock.lineTo).toHaveBeenCalledWith(150, 150);
    expect(ctxMock.lineTo).toHaveBeenCalledWith(100, 150);
    expect(ctxMock.lineTo).toHaveBeenCalledWith(100, 100);
    expect(ctxMock.stroke).toHaveBeenCalled();
    expect(ctxMock.closePath).toHaveBeenCalled();
    expect(ctxMock.arc).toHaveBeenCalledTimes(3);
    expect(ctxMock.fill).toHaveBeenCalledTimes(3);
    expect(ctxMock.strokeStyle).toBe(color);
    expect(ctxMock.fillStyle).toBe(color);
    expect(ctxMock.lineWidth).toBe(LINE_WIDTH);
  });
});
