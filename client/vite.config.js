import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        includePaths: [path.resolve(__dirname, "src/styles")],
      },
    },
  },
});
