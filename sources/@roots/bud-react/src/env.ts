import type BudReact from './extension.js'
import type {reactRefresh} from './react-refresh/api.js'
import type BudReactRefresh from './react-refresh/extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    reactRefresh: reactRefresh
  }

  interface Modules {
    '@roots/bud-react': BudReact
    '@pmmmwh/react-refresh-webpack-plugin': BudReactRefresh
  }
}
