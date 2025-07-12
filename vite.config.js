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
        main: "src/templates/index.html",
        about: "src/templates/about.html",
        contact: "src/templates/contact.html",
        services: "src/templates/services.html",
        solutions: "src/templates/solutions.html",
        telecommunications: "src/templates/telecommunications.html",
      },
    },
    // Copiar archivos PHP al directorio de salida
    copyPublicDir: true,
  },
  server: {
    port: 5000,
    // Configurar para servir archivos PHP en desarrollo
    fs: {
      allow: [".."],
    },
  },
  // Configurar para que copie los archivos PHP
  publicDir: "../public",
});
