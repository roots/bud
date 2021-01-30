import {Bud} from '@roots/bud'

export const setPluginOptions: Bud.PostCss.SetPluginOptions = function (
  name: string,
  options = {},
) {
  this.build.set(
    `items.postcss.options.postcssOptions.plugins.${name}.1`,
    options,
  )

  return this
}
