const {presets} = require('@roots/bud-eslint')

module.exports = {
  root: true,
  extends: [presets.roots],
  parser: 'babel-eslint',
  env: {
    node: true,
    es6: true,
    amd: true,
    browser: true,
    jquery: true,
  },
  parserOptions: {
    ecmaFeatures: {
      globalReturn: true,
      generators: false,
      objectLiteralDuplicateProperties: false,
    },
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['import'],
  settings: {
    'import/core-modules': [],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  rules: {
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
