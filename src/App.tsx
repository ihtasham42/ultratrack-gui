import { Box, Container, Grid, Stack } from "@mantine/core";
import VideoContainer from "./features/video/VideoContainer";
import StatisticsContainer from "./features/statistics/StatisticsContainer";
import SampleFascicleContainer from "./features/fascicle/SampleFascicleContainer";
import SampleRoiContainer from "./features/roi/SampleRoiContainer";

const App = () => {
  return (
    <Box>
      <Container size="xl" py="lg">
        <Grid>
          <Grid.Col span={6}>
            <VideoContainer />
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <StatisticsContainer />
              <Grid>
                <Grid.Col span={6}>
                  <SampleFascicleContainer />
                </Grid.Col>
                <Grid.Col span={6}>
                  <SampleRoiContainer />
                </Grid.Col>
              </Grid>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
