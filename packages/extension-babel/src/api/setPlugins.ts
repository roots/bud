import {lodash as _} from '@roots/bud-support'

/**
 * Merge babel plugins
 */
export const setPlugins: Babel.Config = function (
  plugins: Babel.Plugin[],
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
