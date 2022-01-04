/**
 * WordPress preset default eslint config
 *
 * @public
 */
module.exports = {
  extends: [
    require.resolve('@roots/bud-preset-recommend/eslint-config'),
    require.resolve('@roots/bud-react/eslint-config'),
  ],
  env: {jquery: true},
  globals: {wp: true},
}
