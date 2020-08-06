/**
 * @roots/babel-preset-standard
 */
module.exports = () => ({
  plugins: [require('@babel/plugin-syntax-dynamic-import'), require('@babel/plugin-proposal-object-rest-spread'), ['@babel/plugin-transform-runtime', {
    helpers: false
  }], require('babel-plugin-macros')],
  presets: [require('@babel/preset-env', {
    modules: false,
    forceAllTransforms: true
  }), require('@babel/preset-typescript')]
});