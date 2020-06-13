module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  globals: {
    wp: true,
    window: true,
    document: true,
  },
  env: {
    node: true,
    es6: true,
    browser: true,
    amd: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    strict: 0,
    'no-console': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react-hooks/rules-of-hooks': 'error',
    'no-extra-semi': 0,
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
  },
}
