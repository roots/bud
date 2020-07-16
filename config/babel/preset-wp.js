/**
 * @roots/babel-preset-wp
 */

module.exports = {
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
    require.resolve('@babel/preset-react'),
  ],
  plugins: [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        helpers: false,
      },
    ],
    require.resolve('babel-plugin-macros'),
  ],
}
