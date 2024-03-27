import { createServer } from "miragejs";
import { ComputeVideoResponse } from "../manager/managerModels";

export function makeServer() {
  createServer({
    routes() {
      this.get(
        "/api/video/compute",
        async (): Promise<ComputeVideoResponse> => {
          await new Promise((res) => setTimeout(res, 2000));

          return {
            computedFascicleLengths: {},
            computedRois: {},
          };
        }
      );
    },
  });
}
