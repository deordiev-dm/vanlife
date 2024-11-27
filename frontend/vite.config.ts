import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: BASE_URL,
        changeOrigin: true,
      },
    },
  },
});
