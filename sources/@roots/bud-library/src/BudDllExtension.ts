import {Extension} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

import {library} from './library'

export interface BudDllExtension
  extends Extension.Plugin<AutoDllPlugin, AutoDllPlugin.Options> {
  label: Extension.Plugin['label'] & '@roots/bud-library'
  api: Extension.Plugin['api'] & {
    library: library
  }
}

export const BudDllExtension: BudDllExtension = {
  label: '@roots/bud-library',
  api: {library},
}
