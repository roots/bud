import {Framework} from '@roots/bud-framework'

/**
 * webpack.output.filename
 */
export const filename = ({hooks, store}: Framework) =>
  hooks.filter(
    `webpack.output.filename`,
    store.enabled('options.hash')
      ? store.access('options.hashFormat')
      : '[name].js',
  )

/**
 * webpack.output.publicPath
 */
export const publicPath = ({hooks, store}: Framework) =>
  hooks.filter(
    'webpack.output.publicPath',
    store.access('locations.publicPath'),
  )

/**
 * webpack.output.path
 */
export const path = ({hooks, store}: Framework) =>
  hooks.filter(
    'webpack.output.path',
    store.path.posix.join(
      store.access('locations.project'),
      store.access('locations.dist'),
    ),
  )

/**
 * @webpack5
 * @deprecated
 */
// export const devtoolLineToLine: false
