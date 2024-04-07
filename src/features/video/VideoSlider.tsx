import { Slider } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { fromTimeToFrame } from "./videoUtils";
import { useEffect, useState } from "react";
import { jumpToTime } from "./videoSlice";

const VideoSlider = () => {
  const { metadata } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!metadata) {
      return;
    }

    const { currentTime, duration } = metadata;
    setValue((currentTime / duration) * 100);
  }, [metadata]);

  if (!metadata) {
    return null;
  }

  const { duration } = metadata;

  const maxFrame = fromTimeToFrame(duration);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    const payload = { time: (newValue / 100) * duration };
    dispatch(jumpToTime(payload));
  };

  const getLabelValue = (value: number) => {
    return fromTimeToFrame((value / 100) * duration);
  };

  const marks = [
    { value: 0, label: "0" },
    { value: 25, label: Math.floor(maxFrame / 4).toString() },
    { value: 50, label: Math.floor(maxFrame / 2).toString() },
    { value: 75, label: Math.floor((maxFrame * 3) / 4).toString() },
    { value: 100, label: maxFrame.toString() },
  ];

  return (
    <Slider
      onChange={handleValueChange}
      label={getLabelValue}
      marks={marks}
      style={{ flex: 1 }}
      color="blue"
      value={value}
      data-testid="video-slider"
    />
  );
};

export default VideoSlider;
