// @ts-check

import eslint from "@eslint/js"
import { defineConfig } from "eslint/config"
import tseslint from "typescript-eslint"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ["eslint.config.mjs", "vite.config.ts", "src-tauri/**/*.js"],
    extends: [tseslint.configs.disableTypeChecked]
  },
  { ignores: ["**/src-tauri/**", "src/main.tsx"] },
  { rules: { "prettier/prettier": ["error", { semi: false, printWidth: 120, trailingComma: "none" }] } }
)
