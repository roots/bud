import {Module} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

import {library} from './library'

interface BudDllExtension
  extends Module<AutoDllPlugin, AutoDllPlugin.Options> {
  name: Module['name'] & '@roots/bud-library'
  api: Module['api'] & {
    library: library
  }
}

const BudDllExtension: BudDllExtension = {
  name: '@roots/bud-library',
  api: {library},
}

export {BudDllExtension}
