import {Bud} from '@roots/bud'
import {isString, uniqueId} from 'lodash'

export const addPlugin: Bud.PostCss.AddPlugin = function (
  plugin: string | CallableFunction,
  options?: {[key: string]: unknown},
) {
  const pluginName = isString(plugin)
    ? plugin
    : plugin.name ?? uniqueId('postcss')

  this.options.set(
    `postcss.postcssOptions.plugins.${pluginName}`,
    options ? [plugin, options] : [plugin],
  )

  return this
}
