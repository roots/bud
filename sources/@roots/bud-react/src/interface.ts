import '@roots/bud-framework'
import '@roots/bud-babel'

import BudReact from './extension'
import BudReactRefresh from './react-refresh/extension'
import {reactRefresh} from './react-refresh/reactRefresh'

declare module '@roots/bud-framework' {
  interface Bud {
    reactRefresh: reactRefresh
  }

  interface Modules {
    '@roots/bud-react': BudReact
    '@pmmmwh/react-refresh-webpack-plugin': BudReactRefresh
  }
}
