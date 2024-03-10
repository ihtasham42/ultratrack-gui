import { Box, Container } from "@mantine/core";
import VideoContainer from "./features/video/VideoContainer";

const App = () => {
  return (
    <Box>
      <Container size="xl" py="lg">
        <VideoContainer />
      </Container>
    </Box>
  );
};

export default App;
