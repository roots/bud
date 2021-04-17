import {Imagemin} from '@roots/bud-framework'

export const imagemin: Imagemin.Configure = function (options) {
  this.hooks.on(
    'extension/image-minimizer-webpack-plugin/options',
    () => options,
  )

  return this
}
