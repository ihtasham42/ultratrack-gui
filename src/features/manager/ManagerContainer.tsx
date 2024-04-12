import { Alert, Button, Card, Group, Title } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
  clearComputedFascicleLengths,
  clearSampleFascicleLengths,
} from "../fascicle/fascicleSlice";
import { clearComputedRois, clearSampleRois } from "../roi/roiSlice";
import { IconX } from "@tabler/icons-react";
import { computeVideo } from "./managerSlice";

const ManagerContainer = () => {
  const state = useAppSelector((state) => state.manager);
  const { loading, error } = state;

  const dispatch = useAppDispatch();

  const handleClearData = () => {
    dispatch(clearSampleFascicleLengths());
    dispatch(clearComputedFascicleLengths());
    dispatch(clearSampleRois());
    dispatch(clearComputedRois());
  };

  const handleComputeVideo = () => {
    dispatch(computeVideo());
  };

  return (
    <Card withBorder style={{ maxWidth: "max-content" }}>
      <Title order={5} mb="sm">
        Data Manager
      </Title>
      {!error ? (
        <Group gap="xs">
          <Button
            size="compact-sm"
            loading={loading}
            onClick={handleComputeVideo}
            data-testid="compute-video-button"
          >
            Compute Video
          </Button>
          <Button
            size="compact-sm"
            loading={loading}
            color="red"
            onClick={handleClearData}
            data-testid="clear-data-button"
          >
            Clear Data
          </Button>
        </Group>
      ) : (
        <Alert
          variant="light"
          color="red"
          title="An error has occured"
          icon={<IconX />}
          data-testid="error-alert"
        />
      )}
    </Card>
  );
};

export default ManagerContainer;
