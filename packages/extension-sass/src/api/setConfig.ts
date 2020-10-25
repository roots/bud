import {lodash as _} from '@roots/bud-support'

/**
 * Set sass options
 */
export const setConfig: Sass.Config = function (user) {
  this.bud.build.mergeItem('sass', {options: user})

  return this
}
