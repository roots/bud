import {BudReactExtension} from './extension'
import {reactRefresh} from './react-refresh/config'
import {BudReactRefreshExtension} from './react-refresh/extension'

declare module '@roots/bud-framework' {
  interface Framework {
    reactRefresh: reactRefresh
  }
  interface Modules {
    '@roots/bud-react': BudReactExtension
  }
  interface CompilerPlugin {
    '@pmmmwh/react-refresh-webpack-plugin': BudReactRefreshExtension
  }
}
