/**
 * Default eslint config
 *
 * @public
 */
module.exports = {
  extends: ['eslint:recommended'],
  env: {
    browser: true,
    es6: true,
    node: true,
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
