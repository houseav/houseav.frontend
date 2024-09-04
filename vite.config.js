import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  // Define your BASE_API_URL using the environment variable or fallback to localhost
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
      port: 3000,
    },
    define: {
      VITE_FIREBASE_API_KEY: JSON.stringify(env.VITE_FIREBASE_API_KEY),
      VITE_FIREBASE_AUTHDOMAIN: JSON.stringify(env.VITE_FIREBASE_AUTHDOMAIN),
      VITE_FIREBASE_PROJECT_ID: JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
      VITE_FIREBASE_STORAGE_BUCKET: JSON.stringify(
        env.VITE_FIREBASE_STORAGE_BUCKET
      ),
      VITE_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(
        env.VITE_FIREBASE_MESSAGING_SENDER_ID
      ),
      VITE_FIREBASE_APP_ID: JSON.stringify(env.VITE_FIREBASE_APP_ID),
    },
    build: {
      rollupOptions: {
        assetsInclude: ["**/*.node"],
        external: ["fsevents", "@swc/core", "@swc/wasm"],
      },
    },
  };
});

export function getEnvVariables(mode) {
  const env = loadEnv(mode, process.cwd());

  return {
    BASE_API_URL: env.VITE_ENDPOINT_API_V1 || "http://localhost:3000",
    VITE_FIREBASE_API_KEY: JSON.stringify(env.VITE_FIREBASE_API_KEY),
    VITE_FIREBASE_AUTHDOMAIN: JSON.stringify(env.VITE_FIREBASE_AUTHDOMAIN),
    VITE_FIREBASE_PROJECT_ID: JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
    VITE_FIREBASE_STORAGE_BUCKET: JSON.stringify(
      env.VITE_FIREBASE_STORAGE_BUCKET
    ),
    VITE_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(
      env.VITE_FIREBASE_MESSAGING_SENDER_ID
    ),
    VITE_FIREBASE_APP_ID: JSON.stringify(env.VITE_FIREBASE_APP_ID),
  };
}
