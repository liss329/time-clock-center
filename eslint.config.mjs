import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];