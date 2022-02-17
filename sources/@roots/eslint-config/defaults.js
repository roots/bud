/**
 * Base eslint config
 *
 * @public
 */
module.exports = {
  extends: ['eslint:recommended'],
  plugins: ['import'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      jsx: true,
    },
    ecmaVersion: 2020,
  },
}
