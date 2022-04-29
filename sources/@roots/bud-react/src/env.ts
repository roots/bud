import BudReact from './extension'
import {reactRefresh} from './react-refresh/api'
import BudReactRefresh from './react-refresh/extension'

declare module '@roots/bud-framework' {
  interface Bud {
    reactRefresh: reactRefresh
  }

  interface Modules {
    '@roots/bud-react': BudReact
    '@pmmmwh/react-refresh-webpack-plugin': BudReactRefresh
  }
}
