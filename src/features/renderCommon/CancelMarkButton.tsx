import { useAppDispatch } from "../../common/hooks";
import { MarkMode } from "../video/videoModels";
import { setMarkMode } from "../video/videoSlice";
import { Button } from "@mantine/core";

const CancelMarkButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setMarkMode({ mode: MarkMode.DISABLED }));
  };

  return (
    <Button color="red" size="compact-sm" onClick={handleClick}>
      x Cancel
    </Button>
  );
};

export default CancelMarkButton;
