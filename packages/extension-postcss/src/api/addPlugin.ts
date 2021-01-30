import {Bud} from '@roots/bud'
import {isString, uniqueId} from 'lodash'

export const addPlugin: Bud.PostCss.AddPlugin = function (
  plugin,
  options,
): Bud {
  const src = !Array.isArray(plugin) ? plugin : plugin[1]
  const name = isString(plugin) ? plugin : uniqueId('postcss')

  this.build.set(
    `items.postcss.options.postcssOptions.plugins.${name}`,
    options ? [src, options] : [src],
  )

  return this
}
