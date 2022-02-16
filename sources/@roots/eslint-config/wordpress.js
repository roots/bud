/**
 * WordPress preset
 *
 * @public
 */
module.exports = {
  extends: ['./react'],
  env: {
    jquery: true,
  },
  globals: {wp: true},
}
