import React from "react";
import { Button, SegmentedControl } from "@mantine/core";

const App = () => {
  return (
    <div>
      <div> hello</div>
      <Button>Test</Button> 
      <SegmentedControl data={['React', 'Angular', 'Vue']} />
    </div>
  );
};

export default App;
