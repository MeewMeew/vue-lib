import pluginJs from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue, { rules } from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['node_modules', 'dist', 'build', 'public']
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,vue}']
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    name: 'base-lint',
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      quotes: ['warn', 'single'],
      semi: ['warn', 'never'],
      indent: ['warn', 2],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    }
  },
]