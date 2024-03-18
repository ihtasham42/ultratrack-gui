import { Box, Container, Grid } from "@mantine/core";
import VideoContainer from "./features/video/VideoContainer";
import StatisticsContainer from "./features/statistics/StatisticsContainer";

const App = () => {
  return (
    <Box>
      <Container size="xl" py="lg">
        <Grid>
          <Grid.Col span={6}>
            <VideoContainer />
          </Grid.Col>
          <Grid.Col span={6}>
            <StatisticsContainer />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
