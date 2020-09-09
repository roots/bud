export = {
  extends: ['eslint:recommended'],
  parser: require.resolve('babel-eslint'),
  parserOptions: {
    ecmaFeatures: {
      globalReturn: true,
      generators: false,
      objectLiteralDuplicateProperties: false,
    },
    ecmaVersion: 2018,
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
}
