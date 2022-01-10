/**
 * Recommended preset default eslint config
 *
 * @public
 */
module.exports = {
  extends: [
    require.resolve('@roots/bud-eslint/eslint-config'),
    require.resolve('@roots/bud-babel/eslint-config'),
  ],
}
