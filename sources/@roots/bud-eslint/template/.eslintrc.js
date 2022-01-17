module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es6: true,
    amd: true,
    browser: true,
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
    requireConfigFile: false,
  },
  plugins: ['import', 'prettier'],
  settings: {
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
