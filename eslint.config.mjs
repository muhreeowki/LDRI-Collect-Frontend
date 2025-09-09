import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { fixupConfigRules } from "@eslint/compat";
import baseConfig from "../../eslint.config.mjs";
const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
});

export default [
  ...fixupConfigRules(compat.extends("next")),
  ...fixupConfigRules(compat.extends("next/core-web-vitals")),
  ...baseConfig,
  {
    ignores: [".next/**/*"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-case-declarations": "off",
      "no-prototype-builtins": "off",
      "eslint-disable-directive": "off",
    },
  },
];
