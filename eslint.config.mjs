import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // For JavaScript files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
  },

  // For TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // If you use project-based rules (like recommended-requiring-type-checking),
        // you'll need "project: './tsconfig.json'" here:
        // project: './tsconfig.json',
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
          ...globals.browser,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      // If you want React rules for TS as well:
      react: pluginReact,
    },
    // Use TypeScript ESLint recommended rules; also reuse React if needed
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      // Add or override rules here
    },
  },
];
