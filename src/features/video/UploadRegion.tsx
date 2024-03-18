import { Group, Text, rem } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { IconUpload, IconVideo, IconX } from "@tabler/icons-react";
import { uploadVideo } from "./videoSlice";
import { useAppDispatch } from "../../common/hooks";

const UploadRegion = () => {
  const dispatch = useAppDispatch();

  const handleUpload = (files: FileWithPath[]) => {
    const file = files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const name = file.name;

      const video = document.createElement("video");
      video.src = url;

      video.addEventListener("loadedmetadata", () => {
        const duration = video.duration;

        dispatch(uploadVideo({ source: url, duration, name }));
      });
    }
  };

  return (
    <Dropzone
      onDrop={handleUpload}
      onReject={(files) => console.log("rejected files", files)}
      accept={undefined}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconVideo
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag video here or click to select file
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Accepted file types: .avi
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

export default UploadRegion;
