/**
 * Recommended preset default eslint config
 *
 * @public
 */
module.exports = {
  extends: ['./defaults'],
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
