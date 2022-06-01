/**
 * Babel default eslint config
 *
 * @public
 */
module.exports = {
  extends: ['./defaults'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
}
