/**
 * Sage default eslint config
 */

module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    wp: true,
  },
  env: {
    node: true,
    es6: true,
    amd: true,
    browser: true,
    jquery: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      globalReturn: true,
      generators: false,
      impliedStrict: true,
      jsx: true,
      objectLiteralDuplicateProperties: false,
    },
    ecmaVersion: 2017,
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['import', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/core-modules': [],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  rules: {
    'no-console': 0,
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
