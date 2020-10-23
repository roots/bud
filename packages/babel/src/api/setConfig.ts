import {lodash as _} from '@roots/bud-support'
import type {ConfigureBabel} from '.'

/**
 * Set babel transformOptions
 */
export const setConfig: ConfigureBabel = function (
  options: babel.TransformOptions,
) {
  this.bud.build.mergeItem('babel', {options})

  return this
}
