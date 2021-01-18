import {Bud} from '@roots/bud'

export const setPluginOptions: Bud.PostCss.SetPluginOptions = function (
  name: string,
  options = {},
) {
  this.options.set(
    `postcss.postcssOptions.plugins.${name}.1`,
    options,
  )

  return this
}
