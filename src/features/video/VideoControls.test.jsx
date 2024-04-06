import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import VideoControls from "./VideoControls";
import { describe, expect, it } from "vitest";
import { render } from "../../common/testUtils";
import { VideoPlaybackState } from "./videoModels";

describe("VideoControls Integration Test", () => {
  // Helper function to create a pre-configured store for each test
  const renderWithStore = (initialState) => {
    const store = configureStore({
      reducer: {
        video: videoReducer,
      },
      preloadedState: initialState,
    });

    return render(
      <Provider store={store}>
        <VideoControls />
      </Provider>
    );
  };

  it("initializes video and manipulates current time with next and previous buttons", () => {
    const initialState = {
      video: {
        metadata: {
          duration: 120,
          currentTime: 0,
          playbackState: VideoPlaybackState.PAUSED,
        },
      },
    };

    renderWithStore(initialState);

    expect(screen.getByTestId("play-icon")).toBeInTheDocument();

    const playbackButton = screen.getByTestId("playback-button");

    fireEvent.click(playbackButton);
    expect(screen.getByTestId("pause-icon")).toBeInTheDocument();

    const stepForwardButton = screen.getByTestId("step-forward-button");
    const stepBackwardButton = screen.getByTestId("step-backward-button");

    expect(screen.getByDisplayValue("0")).toBeInTheDocument();

    fireEvent.click(stepBackwardButton);

    expect(screen.getByDisplayValue("0")).toBeInTheDocument();

    fireEvent.click(stepForwardButton);

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();

    fireEvent.click(stepForwardButton);

    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });
});
