// @ts-check

import eslint from "@eslint/js"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["eslint.config.mjs", "vite.config.ts", "src-tauri/**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    ignores: ["**/src-tauri/**", "src/main.tsx"],
  }
)
