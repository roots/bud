/**
 * Sage default eslint config
 *
 * @public
 */
module.exports = {
  extends: [require.resolve('@roots/bud-preset-wordpress/eslint-config')],
  rules: {
    'no-console': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
  },
}
