module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:json/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['json'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'json/*': 'error',
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
  },
};
