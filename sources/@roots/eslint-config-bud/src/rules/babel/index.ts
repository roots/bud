/**
 * Babel default eslint config
 *
 * @public
 */
module.exports = {
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
    ecmaVersion: 2018,
    requireConfigFile: false,
    sourceType: 'module',
  },
}
