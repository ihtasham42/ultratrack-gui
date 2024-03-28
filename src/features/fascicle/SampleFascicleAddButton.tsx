import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { fromTimeToFrame } from "../video/videoUtils";
import {
  AddSampleFascicleLengthPayload,
  addSampleFascicleLength,
} from "./fascicleSlice";

const SampleFascicleAddButton = () => {
  const { metadata } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  const handleAddFascicleLength = () => {
    if (!metadata) return;

    const { currentTime } = metadata;
    const frameNumber = fromTimeToFrame(currentTime);

    const point1 = {
      x: 125 + (Math.random() - 0.5) * 150,
      y: 350 + (Math.random() - 0.5) * 150,
    };

    const point2 = {
      x: 500 + (Math.random() - 0.5) * 150,
      y: 350 + (Math.random() - 0.5) * 150,
    };

    const payload: AddSampleFascicleLengthPayload = {
      point1,
      point2,
      frameNumber,
    };

    dispatch(addSampleFascicleLength(payload));
  };

  return (
    <Button size="compact-sm" onClick={handleAddFascicleLength}>
      + New
    </Button>
  );
};

export default SampleFascicleAddButton;
