/**
 * Babel default eslint config
 */
module.exports = {
  extends: [`./defaults.cjs`],
  parser: `@babel/eslint-parser`,
  parserOptions: {
    requireConfigFile: false,
  },
}
