import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import unimport from "unimport/unplugin";
import { unimportConfig } from "./unplugins.js";

export default defineConfig({
  test: {
    globals: true,
    reporters: ["basic"],
    passWithNoTests: true,
    hookTimeout: 20_000
  },
  plugins: [unimport.vite(unimportConfig), tsconfigPaths()]
});
