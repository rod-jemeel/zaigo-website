// Modern flat config for ESLint
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use compat layer for the old config format
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Modern flat config
const eslintConfig = [
  // Use the recommended Next.js configuration
  ...compat.config({
    extends: ['next/core-web-vitals'],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
    },
  }),
  
  // Override patterns for build output and other paths
  {
    ignores: [
      "**/.next/**",
      "**/out/**",
      "**/node_modules/**",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/public/**"
    ]
  },
];

export default eslintConfig;