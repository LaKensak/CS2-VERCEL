import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  ...nextPlugin.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // 🚫 désactive l'erreur sur any
      "@typescript-eslint/no-unused-vars": ["warn"], // ⚠ juste un warning si une variable est inutilisée
    },
  }
];

export default eslintConfig;
