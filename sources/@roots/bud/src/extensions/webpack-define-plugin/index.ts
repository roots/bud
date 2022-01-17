import {DefinePlugin} from './webpack-define-plugin.dependencies'
import type {BudWebpackDefinePlugin} from './webpack-define-plugin.interface'

export const name: BudWebpackDefinePlugin['name'] = 'webpack-define-plugin'

export const make: BudWebpackDefinePlugin['make'] = options =>
  new DefinePlugin(options.all())

export const when: BudWebpackDefinePlugin['when'] = (_, opts) =>
  opts?.getEntries()?.length > 0

export const options: BudWebpackDefinePlugin['options'] = ({env}) =>
  env.getPublicEnv() ?? {}
