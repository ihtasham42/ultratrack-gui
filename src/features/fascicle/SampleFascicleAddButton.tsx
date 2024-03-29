import { Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { setMarkMode } from "../video/videoSlice";
import { MarkMode } from "../video/videoModels";
import CancelMarkButton from "../renderCommon/CancelMarkButton";

const SampleFascicleAddButton = () => {
  const { mark } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  const { mode } = mark;

  const handleAddFascicleLength = () => {
    if (mode === MarkMode.FASCICLE_LENGTH) {
      dispatch(setMarkMode({ mode: MarkMode.DISABLED }));
    } else {
      dispatch(setMarkMode({ mode: MarkMode.FASCICLE_LENGTH }));
    }
  };

  return mode === MarkMode.FASCICLE_LENGTH ? (
    <CancelMarkButton />
  ) : (
    <Button size="compact-sm" onClick={handleAddFascicleLength}>
      + New
    </Button>
  );
};

export default SampleFascicleAddButton;
