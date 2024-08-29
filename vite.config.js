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
        },
        "/house": {
          target: BASE_API_URL,
          secure: false,
        },
        "/user": {
          target: BASE_API_URL,
          secure: false,
        },
        "/role": {
          target: BASE_API_URL,
          secure: false,
        },
        "/church": {
          target: BASE_API_URL,
          secure: false,
        },
        "/queue-user-registration": {
          target: BASE_API_URL,
          secure: false,
        },
        "/queue-house-registration": {
          target: BASE_API_URL,
          secure: false,
        },
        "/forgot-password/request": {
          target: BASE_API_URL,
          secure: false,
        },
        "/forgot-password/check": {
          target: BASE_API_URL,
          secure: false,
        },
        "/forgot-password/reset": {
          target: BASE_API_URL,
          secure: false,
        },
      },
    },

    plugins: [react()],
  };
});
