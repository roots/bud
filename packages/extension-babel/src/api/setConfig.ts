import {lodash as _} from '@roots/bud-support'

/**
 * Set babel transformOptions
 */
export const setConfig: Babel.Config = function (
  options: babel.TransformOptions,
) {
  this.bud.build.mergeItem('babel', {options})

  return this
}
