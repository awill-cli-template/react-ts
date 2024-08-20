// @ts-nocheck
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactScopedCssPlugin } from "rollup-plugin-react-scoped-css";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
      components: join(__dirname, "src/components"),
      assets: join(__dirname, "src/assets"),
      pages: join(__dirname, "src/pages"),
      utils: join(__dirname, "src/utils"),
      apis: join(__dirname, "src/apis"),
      hocs: join(__dirname, "src/hocs"),
      hooks: join(__dirname, "src/hooks"),
      store: join(__dirname, "src/store"),
      router: join(__dirname, "src/router"),
      types: join(__dirname, "src/types"),
      constants: join(__dirname, "src/constants"),
    },
  },
  plugins: [react(), reactScopedCssPlugin()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
