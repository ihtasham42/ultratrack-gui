import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";

interface VitestConfig extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
} as VitestConfig);
