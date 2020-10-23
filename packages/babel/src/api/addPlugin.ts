import {lodash as _} from '@roots/bud-support'
import type {BabelConfig, ConfigureBabel} from '.'

/**
 * Merge babel plugins
 */
export const addPlugin: ConfigureBabel = function (
  this: BabelConfig,
  name: babel.PluginTarget,
  pluginOptions?: babel.PluginOptions,
) {
  const {options} = this.bud.build.getItem('babel') as any // 😇

  const plugin = [name]
  pluginOptions && plugin.push(pluginOptions)

  this.bud.build.mergeItem('babel', {
    options: {
      ...options,
      plugins: [...(options.plugins ?? []), plugin],
    },
  })

  return this
}
