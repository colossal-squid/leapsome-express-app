/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [],
  overrides: [
    {
      files: ["src/api/**/*.ts"],
      extends: ["eslint:recommended", "typescript", "prettier"],
    },
  ],
};
