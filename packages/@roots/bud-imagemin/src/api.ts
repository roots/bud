import {Framework} from '@roots/bud-framework'

/**
 * Configure imagemin plugins.
 */
export const imagemin: Framework.Imagemin.Configure = function (
  options,
) {
  this.publish(
    {
      'extension/image-minimizer-webpack-plugin/options': () =>
        options,
    },
    '@roots/bud-imagemin/api',
  )

  return this
}
