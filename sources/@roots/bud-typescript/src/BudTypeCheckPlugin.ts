import {Extension, Framework} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import {ForkTsCheckerWebpackPluginOptions as Options} from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPluginOptions'

import {DEVELOPMENT_OPTIONS, PRODUCTION_OPTIONS} from './constants'

interface BudTypeCheckPlugin
  extends Extension.CompilerPlugin<ForkTsCheckerWebpackPlugin, Options> {}

export const name: BudTypeCheckPlugin['name'] =
  'fork-ts-checker-webpack-plugin'

export const options: BudTypeCheckPlugin['options'] = (app: Framework) => {
  return app.isProduction
    ? PRODUCTION_OPTIONS(app)
    : DEVELOPMENT_OPTIONS(app)
}

export const make: BudTypeCheckPlugin['make'] = () =>
  new ForkTsCheckerWebpackPlugin()
