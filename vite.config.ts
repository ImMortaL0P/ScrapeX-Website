import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Built as a plain static bundle so GitHub Pages can serve it from /dist.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: { outDir: "dist", assetsDir: "assets", sourcemap: false },
});
