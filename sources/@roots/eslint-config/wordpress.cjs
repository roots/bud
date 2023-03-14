/**
 * WordPress preset
 */
module.exports = {
  extends: [`./react.cjs`],
  env: {
    jquery: true,
  },
  globals: {wp: true},
}
