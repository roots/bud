import {lodash as _} from '@roots/bud-support'
import type {ConfigureBabel} from '.'

/**
 * Merge babel plugins
 */
export const setPlugins: ConfigureBabel = function (
  plugins: babel.PluginItem[],
) {
  const {options} = this.bud.build.getItem('babel') as any // 😇

  this.bud.build.mergeItem('babel', {
    options: {
      ...options,
      plugins,
    },
  })

  return this
}
