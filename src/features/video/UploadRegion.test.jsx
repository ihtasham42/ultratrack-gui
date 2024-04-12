import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import UploadRegion from "./UploadRegion";
import { useAppSelector } from "../../common/hooks";
import { render } from "../../common/testUtils";

// Mock hooks
vi.mock("../../common/hooks", () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe("UploadRegion", () => {
  it("renders initial idle state with appropriate text", () => {
    vi.mocked(useAppSelector).mockReturnValue({
      video: {
        source: null,
        metadata: null,
      },
    });

    render(<UploadRegion />);
    expect(
      screen.getByText(/drag video here or click to select file/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/accepted file types: .avi/i)).toBeInTheDocument();
  });
});
