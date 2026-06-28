import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["**/vitest.config.ts"] },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: {
          // Allows loose config files like vitest.config.ts to parse without throwing errors
          allowDefaultProject: ['vitest.config.ts', 'eslint.config.js', 'setupTests.ts'], 
        },
        tsconfigRootDir: import.meta.dirname, 
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      semi: ['error', 'never']
    },
  },
])
