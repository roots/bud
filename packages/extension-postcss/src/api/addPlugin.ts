import {Bud} from '@roots/bud'

export const addPlugin: Bud.PostCss.AddPlugin = function (
  plugin: string,
  options?: {[key: string]: unknown},
) {
  this.build.merge(
    'items.postcss.options.postcssOptions.plugins',
    [plugin, options],
  )

  return this
}
