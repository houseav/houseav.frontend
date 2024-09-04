import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  return {
    preview: {
      port: 5137,
    },
    build: {
      rollupOptions: {
        assetsInclude: ["**/*.node"],
        external: ["fsevents", "@swc/core", "@swc/wasm"],
      },
    },
  };
});

