import createConfig from '@repo/eslint-config/eslint.config'

export default [
  ...createConfig(import.meta.dirname),
  {
    files: ['/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
    }
  }
]