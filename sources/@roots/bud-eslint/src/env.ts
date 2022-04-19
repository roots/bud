import * as api from './eslint.api'
import {BudEslintWebpackPlugin} from './eslint.extension'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: api.eslint
    eslintConfig: api.eslint['config']
  }

  interface Modules {
    'eslint-webpack-plugin': BudEslintWebpackPlugin
  }
}
