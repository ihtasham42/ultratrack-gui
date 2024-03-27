import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/api/video/compute", () => ({}));
  },
});
