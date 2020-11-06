import {lodash as _} from '@roots/bud-support'

/**
 * Merge sass transformOptions
 */
export const mergeConfig: Sass.Config = function (cfg) {
  this.bud.build.items.merge('sass.options', cfg)

  return this
}
