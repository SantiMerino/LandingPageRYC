import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "src/templates/index.html"),
    },
    copyPublicDir: true,
  },
  server: {
    port: 5000,
  },
  publicDir: "public",
});
