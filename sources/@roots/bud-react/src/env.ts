import BudReact from './extension.js'
import {reactRefresh} from './react-refresh/api.js'
import BudReactRefresh from './react-refresh/extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    reactRefresh: reactRefresh
  }

  interface Modules {
    '@roots/bud-react': BudReact
    '@pmmmwh/react-refresh-webpack-plugin': BudReactRefresh
  }
}
