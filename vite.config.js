import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        acercade: resolve(__dirname, "about.html"),
        contacto: resolve(__dirname, "contact.html"),
        soluciones: resolve(__dirname, "solutions.html"),
        telecomunicaciones: resolve(__dirname, "telecomunications.html"),
      },
    },
  },
  server: {
    port: 5000,
  },
  publicDir: "public",
  assetsInclude: ["**/*.js"],
});
