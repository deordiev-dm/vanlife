import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default () => {
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
  });
};
