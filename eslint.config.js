import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**', '.sites-runtime/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts,astro}'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  { files: ['**/*.astro'], languageOptions: { parserOptions: { parser: ts.parser } } },
];
