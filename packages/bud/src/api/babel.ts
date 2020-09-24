import {TransformOptions} from '@babel/core'
import BudInterface from '../Bud'

/**
 * ## bud.babel
 *
 * Configure Babel.
 *
 * If you prefer, you may utilize a `babel.config.js` file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of the project config file.
 *
 * @see https://babeljs.io/docs/en/configuration
 */
export type Babel = (
  this: BudInterface,
  options: TransformOptions,
) => BudInterface

export const babel: Babel = function (
  options: TransformOptions,
) {
  this.features.enable('babel')

  this.loaders.merge(
    'babel.options',
    this.hooks.filter('api.babel', options),
  )

  return this
}
