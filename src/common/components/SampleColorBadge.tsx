import { Box } from "@mantine/core";
import { getRenderColor } from "../../features/renderCommon/renderUtils";

type Props = {
  sampleId: string;
};

const SampleColorBadge = ({ sampleId }: Props) => {
  return (
    <Box
      style={{
        borderRadius: "50%",
        backgroundColor: getRenderColor(sampleId),
        width: 10,
        height: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default SampleColorBadge;
