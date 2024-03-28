import { Button } from "@mantine/core";
import { useAppDispatch } from "../../common/hooks";
import { Roi } from "./roiModels";

const SampleRoiAddButton = () => {
  const dispatch = useAppDispatch();

  const handleAddSampleRoi = () => {
    const roi: Roi = {
      points: [],
    };
  };

  return (
    <Button size="compact-sm" onClick={handleAddSampleRoi}>
      + New
    </Button>
  );
};

export default SampleRoiAddButton;
