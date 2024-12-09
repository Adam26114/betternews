import pluginJs from "@eslint/js";
import eslintPrettierConfig from "eslint-config-prettier";
import drizzlePlugin from "eslint-plugin-drizzle";
import { finUpPluginRules } from "eslint/conpat";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPrettierConfig,
  {
    plugins: {
      drizzle: finUpPluginRules(drizzlePlugin),
    },
  },
];
