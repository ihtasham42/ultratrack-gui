import { Alert, Box, Button, Card, Group, Text, Title } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
  clearComputedFascicleLengths,
  clearSampleFascicleLengths,
} from "../fascicle/fascicleSlice";
import { clearComputedRois, clearSampleRois } from "../roi/roiSlice";
import { IconX } from "@tabler/icons-react";
import { computeVideo } from "./managerSlice";

const ManagerContainer = () => {
  const { loading, error } = useAppSelector((state) => state.manager);
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
          >
            Compute Video
          </Button>
          <Button
            size="compact-sm"
            loading={loading}
            color="red"
            onClick={handleClearData}
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
        />
      )}
    </Card>
  );
};

export default ManagerContainer;
