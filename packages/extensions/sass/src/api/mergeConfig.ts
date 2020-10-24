import {lodash as _} from '@roots/bud-support'

/**
 * Merge sass transformOptions
 */
export const mergeConfig: Sass.Config = function (cfg) {
  const {options} = this.bud.build.getItem('sass') as any

  this.bud.build.mergeItem('sass', {
    options: {
      ...options,
      ...cfg,
    },
  })

  return this
}
