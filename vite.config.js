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
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/pages/about.html"),
        services: resolve(__dirname, "src/pages/services.html"),
        portfolio: resolve(__dirname, "src/pages/portfolio.html"),
        contact: resolve(__dirname, "src/pages/contact.html"),
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
