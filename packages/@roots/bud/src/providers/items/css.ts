import {Framework} from '@roots/bud-framework'

export const css = (app: Framework) => ({
  loader: require.resolve('css-loader'),
  options: {
    sourceMap:
      app.hooks.filter('webpack.devtool', false) !== false,
  },
})
