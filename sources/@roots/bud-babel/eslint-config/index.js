/**
 * Babel default eslint config
 *
 * @public
 */
module.exports = {
  extends: [require.resolve('@roots/bud-eslint/eslint-config')],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      globalReturn: false,
      jsx: true,
    },
    ecmaVersion: 2020,
    requireConfigFile: false,
    sourceType: 'module',
  },
}
