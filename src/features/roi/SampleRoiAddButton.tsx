import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { MarkMode } from "../video/videoModels";
import { setMarkMode } from "../video/videoSlice";
import CancelMarkButton from "../renderCommon/CancelMarkButton";

const SampleRoiAddButton = () => {
  const { mark } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  const { mode } = mark;

  const handleAddSampleRoi = () => {
    if (mode === MarkMode.ROI) {
      dispatch(setMarkMode({ mode: MarkMode.DISABLED }));
    } else {
      dispatch(setMarkMode({ mode: MarkMode.ROI }));
    }
  };

  return mode === MarkMode.ROI ? (
    <CancelMarkButton />
  ) : (
    <Button size="compact-sm" onClick={handleAddSampleRoi}>
      + New
    </Button>
  );
};

export default SampleRoiAddButton;
