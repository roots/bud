import {Imagemin, Framework} from '@roots/bud-framework'

export const imagemin: Imagemin.Configure = function (
  this: Framework,
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
