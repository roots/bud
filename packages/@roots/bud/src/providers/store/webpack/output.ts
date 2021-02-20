import {Bud} from '../../../Bud'

/**
 * webpack.output.filename
 */
export const filename = (bud: Bud) =>
  bud.hooks.filter(
    `webpack.output.filename`,
    bud.options.isTrue('hash')
      ? `[name].[contenthash].js`
      : '[name].js',
  )

/**
 * webpack.output.publicPath
 */
export const publicPath = (bud: Bud) =>
  bud.hooks.filter(
    'webpack.output.publicPath',
    bud.options.access('publicPath') ?? '/',
  )

/**
 * webpack.output.path
 */
export const path = ({disk, hooks, options}: Bud) =>
  hooks.filter(
    'webpack.output.path',
    disk.path.join(options.get('project'), options.get('dist')),
  )

/**
 * @question set ctx `this`?
 */
// globalObject: 'window'

/**
 * @webpack5
 * @deprecated
 */
// export const devtoolLineToLine: false
