// import js from "@eslint/js";
// import globals from "globals";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";


// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
//   pluginReact.configs.flat.recommended,
// ]);

import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["SERVER/**/*.{js,mjs,cjs}"],

  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",  // or "script" if you use CommonJS fully
    globals: {
      ...globals.node,  // provides 'require', 'module', 'process', etc.
    },
  },

  plugins: {
    js,
  },

  rules: {
    ...js.configs.recommended.rules,
  },
});