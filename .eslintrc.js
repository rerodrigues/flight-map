module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'json'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es2020: true,
    browser: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'json/*': 'error',
    'react/jsx-filename-extension': ["error", { extensions: ['.ts', '.tsx'] }],
    'import/extensions': ['error', 'never', { 'svg': 'always' }],
    'import/no-extraneous-dependencies': ["error", { devDependencies: ['**/{test,spec}.tsx?'] }],
    'react/jsx-one-expression-per-line': 'off',
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    'no-console': 'off',
    'react/state-in-constructor': ['error', 'never'],
    'react/destructuring-assignment': 'off',
  },
};
