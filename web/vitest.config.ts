import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.tsx"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
  },
  resolve: {
    alias: [
      { find: /^@\/components\/(.*)/, replacement: path.resolve(__dirname, "./src/components/$1") },
      { find: /^@\/sanity\/(.*)/, replacement: path.resolve(__dirname, "./src/sanity/$1") },
      { find: /^@\/src\/(.*)/, replacement: path.resolve(__dirname, "./src/$1") },
      { find: /^@\/(.*)/, replacement: path.resolve(__dirname, "./src/$1") },
    ],
  },
});
