import {Extension, Framework} from '@roots/bud-framework'
import Plugin from 'fork-ts-checker-webpack-plugin'

import * as factory from './options'

/**
 * fork-to-webpack-plugin constructor options
 *
 * @public
 */
export type Options = Plugin['options']

/**
 * bud `fork-ts-checker-webpack-plugin` compiler extension
 *
 * @public
 */
export interface BudTypeCheckPlugin
  extends Extension.CompilerPlugin<Plugin, Options> {
  name: 'fork-ts-checker-webpack-plugin'
  options(app: Framework): Options
}

/**
 * extension name
 *
 * @public
 */
export const name: BudTypeCheckPlugin['name'] =
  'fork-ts-checker-webpack-plugin'

/**
 * extension options
 *
 * @public
 */
export const options: BudTypeCheckPlugin['options'] = (app: Framework) => {
  return app.isProduction
    ? factory.production(app)
    : factory.development(app)
}

/**
 * extension make
 *
 * @public
 */
export const make: BudTypeCheckPlugin['make'] = (options, app) =>
  new Plugin(options.all())
