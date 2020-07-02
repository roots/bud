/**
 * @roots/babel-preset-styled
 */

module.exports = () => ({
  plugins: [
    require('babel-plugin-emotion'),
  ],
  presets: [
    require('./preset-react'),
  ],
})
