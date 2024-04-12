import { describe, it, expect, vi } from "vitest";
import SampleColorBadge from "./SampleColorBadge";
import { getRenderColor } from "../../features/renderCommon/renderUtils";
import { render } from "../../common/testUtils";

vi.mock("../../features/renderCommon/renderUtils", () => ({
  getRenderColor: vi.fn(),
}));

describe("SampleColorBadge", () => {
  it("renders correctly with the color from getRenderColor", () => {
    const sampleId = "1";
    const expectedColor = "#ff6347";
    vi.mocked(getRenderColor).mockReturnValue(expectedColor);

    const { container } = render(<SampleColorBadge sampleId={sampleId} />);
    const badge = container.firstChild;
    expect(badge).toBeInTheDocument();
  });
});
