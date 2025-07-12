import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/templates/index.html"),
        about: resolve(__dirname, "src/templates/about.html"),
        contact: resolve(__dirname, "src/templates/contact.html"),
        services: resolve(__dirname, "src/templates/services.html"),
        solutions: resolve(__dirname, "src/templates/solutions.html"),
        telecommunications: resolve(__dirname, "src/templates/telecommunications.html"),
      },
    },
    copyPublicDir: true,
  },
  server: {
    port: 5000,
    fs: {
      allow: [".."],
    },
  },
  publicDir: "../public",
});