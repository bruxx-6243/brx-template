/**
 * ESLint configuration file.
 *
 * This configuration is tailored for a TypeScript project using React,
 * ensuring best practices, optimized import sorting, and removal of unused imports.
 *
 * @module ESLintConfig
 */

import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import * as SimpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * ESLint configuration object.
 *
 * @constant
 * @type {import("typescript-eslint").FlatConfigArray}
 */
export default tseslint.config(
  /**
   * General configuration settings.
   * @type {import("typescript-eslint").FlatConfig}
   */
  { ignores: ["dist", "coverage"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
      "simple-import-sort": SimpleImportSort,
    },
    rules: {
      // Enforce React hooks rules
      ...reactHooks.configs.recommended.rules,

      // Warn on exporting non-components unless explicitly allowed
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Disable default unused variables rule in favor of plugin
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
);
