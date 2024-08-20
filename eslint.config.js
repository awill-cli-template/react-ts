import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/ban-ts-comment": "off",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["components", "./src/components"],
            ["assets", "./src/assets"],
            ["pages", "./src/pages"],
            ["utils", "./src/utils"],
            ["apis", "./src/apis"],
            ["hocs", "./src/hocs"],
            ["hooks", "./src/hooks"],
            ["store", "./src/store"],
            ["router", "./src/router"],
            ["types", "./src/types"],
            ["constants", "./src/constants"],
          ],
        },
      },
    },
  },
);