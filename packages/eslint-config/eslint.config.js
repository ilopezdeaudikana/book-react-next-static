import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Change default export to a function that takes the consumer's directory
export default function createConfig(appDirname) {
  return defineConfig([
    globalIgnores(['dist']),

    js.configs.recommended,
    ...tseslint.configs.recommended,
    // { ignores: ["**/vitest.config.ts"] },
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
            allowDefaultProject: ['vitest.config.ts', 'eslint.config.js', 'setupTests.ts', 'playwright.config.ts', 'e2e/*.{ts,tsx}'], 
          },
          // Force it to use the consuming app's root directory
          tsconfigRootDir: appDirname, 
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
}