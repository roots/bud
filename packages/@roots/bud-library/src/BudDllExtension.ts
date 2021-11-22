import {Extension} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

import {library} from './library'

export interface BudDllExtension
  extends Extension.CompilerPlugin<
    AutoDllPlugin,
    AutoDllPlugin.Options
  > {
  name: Extension.CompilerPlugin['name'] & '@roots/bud-library'
  api: Extension.CompilerPlugin['api'] & {
    library: library
  }
}

export const BudDllExtension: BudDllExtension = {
  name: '@roots/bud-library',
  api: {library},
}
