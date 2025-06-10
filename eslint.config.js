// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      // Performance and best practices
      "@angular-eslint/prefer-on-push-component-change-detection": "warn",
      "@angular-eslint/use-injectable-provided-in": "error",
      "@angular-eslint/no-output-native": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-output-rename": "error",
      "@angular-eslint/use-lifecycle-interface": "error",
      "@angular-eslint/no-conflicting-lifecycle": "error",
      
      // TypeScript best practices (simpler rules that don't require type checking)
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      
      // General code quality
      "prefer-const": "error",
      "no-var": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/eqeqeq": "error",
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/conditional-complexity": ["error", { maxComplexity: 4 }],
    },
  }
);
