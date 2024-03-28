import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { AddSampleRoiPayload, addSampleRoi } from "./roiSlice";
import { fromTimeToFrame } from "../video/videoUtils";

const SampleRoiAddButton = () => {
  const { metadata } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  const handleAddSampleRoi = () => {
    if (!metadata) return;

    const { currentTime } = metadata;
    const frameNumber = fromTimeToFrame(currentTime);

    const points = [
      { x: 150, y: 200 },
      { x: 475, y: 300 },
      { x: 425, y: 500 },
      { x: 100, y: 380 },
    ].map(({ x, y }) => {
      const xr = (Math.random() - 0.5) * 150;
      const yr = (Math.random() - 0.5) * 150;

      return { x: x + xr, y: y + yr };
    });

    const payload: AddSampleRoiPayload = {
      points,
      frameNumber,
    };

    dispatch(addSampleRoi(payload));
  };

  return (
    <Button size="compact-sm" onClick={handleAddSampleRoi}>
      + New
    </Button>
  );
};

export default SampleRoiAddButton;
