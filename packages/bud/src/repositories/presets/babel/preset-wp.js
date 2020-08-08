/**
 * @roots/babel-preset-wp
 */

export default () => any => ({
  presets: [require('@babel/preset-env'), require('@babel/preset-react')],
  plugins: [
    require('@babel/plugin-syntax-dynamic-import'),
    require('@babel/plugin-proposal-object-rest-spread'),
    require('@babel/plugin-transform-runtime'),
  ],
})
