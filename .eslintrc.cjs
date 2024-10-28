/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  plugins: ['simple-import-sort'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-debugger': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    quotes: ['warn', 'single'],
    semi: ['warn', 'never'],
    indent: ['warn', 2],
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
