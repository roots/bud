import {Bud} from '../../../Bud'

/**
 * webpack.output.filename
 */
export const filename = ({hooks, options}: Bud) =>
  hooks.filter(
    `webpack.output.filename`,
    options.isString('hash')
      ? options.access('hash')
      : options.enabled('hash')
      ? `[name].[hash].js`
      : '[name].js',
  )

/**
 * webpack.output.publicPath
 */
export const publicPath = ({hooks, options}: Bud) =>
  hooks.filter(
    'webpack.output.publicPath',
    options.access('publicPath') ?? '/',
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
 * @deprecated webpack5
 */
// export const devtoolLineToLine: false
