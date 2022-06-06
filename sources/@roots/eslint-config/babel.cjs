/**
 * Babel default eslint config
 *
 * @public
 */
module.exports = {
  extends: ['./defaults.cjs'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
}
