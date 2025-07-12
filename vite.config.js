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
        main: "templates/index.html",
        about: "templates/about.html",
        contact: "templates/contact.html",
        services: "templates/services.html",
        solutions: "templates/solutions.html",
        telecommunications: "templates/telecommunications.html",
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
