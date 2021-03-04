import {Framework} from '@roots/bud-framework'

/**
 * webpack.output.filename
 */
export const filename = ({hooks, store}: Framework) =>
  hooks.filter(
    `webpack.output.filename`,
    store.enabled('options.hash')
      ? `[name].[hash].js`
      : '[name].js',
  )

/**
 * webpack.output.publicPath
 */
export const publicPath = ({hooks, store}: Framework) =>
  hooks.filter(
    'webpack.output.publicPath',
    store.access('locations.publicPath') ?? '/',
  )

/**
 * webpack.output.path
 */
export const path = ({hooks, store}: Framework) =>
  hooks.filter(
    'webpack.output.path',
    `${store.get('locations.project')}${store.get(
      'locations.dist',
    )}`,
  )

/**
 * @webpack5
 * @deprecated
 */
// export const devtoolLineToLine: false
