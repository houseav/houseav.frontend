import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const BASE_API_URL = `${env.VITE_ENDPOINT_API_V1 ?? "http://localhost:3000"}`;
  console.log("BASE_API_URL", BASE_API_URL);
  return {
    server: {
      origin: "https://houseavbackend-production.up.railway.app",
      proxy: {
        "/auth": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
        "/house": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
        "/user": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
        "/role": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
        "/church": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
        "/queue-user-registration": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
        "/queue-house-registration": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
        "/forgot-password/request": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
        "/forgot-password/check": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
        "/forgot-password/reset": {
          target: "https://houseavbackend-production.up.railway.app",
          secure: false,
          changeOrigin: false,
          logLevel: "debug", // Add this line
        },
      },
    },
    preview: {
      port: 5173,
    },
    plugins: [react()],
  };
});
