import {DefinePlugin} from 'webpack'

import type {BudWebpackDefinePlugin} from './webpack-define-plugin.interface'

export const label: BudWebpackDefinePlugin['label'] =
  'webpack-define-plugin'

export const options: BudWebpackDefinePlugin['options'] = ({env}) =>
  env.getPublicEnv() ?? {}

export const make: BudWebpackDefinePlugin['make'] = options =>
  new DefinePlugin(options.all())

export const when: BudWebpackDefinePlugin['when'] = (_, opts) =>
  opts?.getEntries()?.length > 0
