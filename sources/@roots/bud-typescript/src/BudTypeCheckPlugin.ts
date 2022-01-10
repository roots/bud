import {Extension, Framework} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import {DEVELOPMENT_CONFIG, PRODUCTION_CONFIG} from './constants'

interface Options {
  async?: boolean
  typescript?: any
  eslint?: any
  formatter?: any
  issue?: any
  logger?: any
}

interface BudTypeCheckPlugin
  extends Extension.CompilerPlugin<ForkTsCheckerWebpackPlugin, Options> {}

const name: BudTypeCheckPlugin['name'] = 'fork-ts-checker-plugin'

const options: BudTypeCheckPlugin['options'] = ({
  isProduction,
}: Framework) => {
  return isProduction ? PRODUCTION_CONFIG : DEVELOPMENT_CONFIG
}

const make: BudTypeCheckPlugin['make'] = () =>
  new ForkTsCheckerWebpackPlugin()

export {name, options, make}
