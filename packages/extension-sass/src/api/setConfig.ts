import {lodash as _} from '@roots/bud-support'

/**
 * Set sass options
 */
export const setConfig: Sass.Config = function (opts) {
  this.bud.build.items.set('sass.options', opts)

  return this
}
