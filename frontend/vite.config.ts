import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  const BACKEND_URL = env.VITE_BACKEND_URL;

  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components/"),
        "@features": path.resolve(__dirname, "./src/features/"),
        "@pages": path.resolve(__dirname, "./src/pages/"),
      },
    },
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
  });
};
