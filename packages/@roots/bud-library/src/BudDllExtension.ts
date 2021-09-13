import {Extension} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

import {library} from './library'

interface BudDllExtension
  extends Extension.CompilerPlugin<
    AutoDllPlugin,
    AutoDllPlugin.Options
  > {
  name: Extension.CompilerPlugin['name'] & '@roots/bud-library'
  api: Extension.CompilerPlugin['api'] & {
    library: library
  }
}

const BudDllExtension: BudDllExtension = {
  name: '@roots/bud-library',
  api: {library},
}

export {BudDllExtension}
