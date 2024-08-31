import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const BASE_API_URL = `${env.VITE_ENDPOINT_API_V1 ?? "http://localhost:3000"}`;

  return {
    server: {
      origin: BASE_API_URL,
      proxy: {
        "/auth": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
        "/house": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
        "/user": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
        "/role": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
        "/church": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
        "/queue-user-registration": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
        "/queue-house-registration": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
        "/forgot-password/request": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
        "/forgot-password/check": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
        "/forgot-password/reset": {
          target: BASE_API_URL,
          secure: false,
          changeOrigin: true,
          logLevel: "debug",
        },
      },
    },
    preview: {
      port: 5173,
    },
    plugins: [react()],
  };
});
