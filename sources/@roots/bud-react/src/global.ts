import {ReactExtension} from './extension'
import {ReactRefreshExtension} from './react-refresh/extension'
import {reactRefresh} from './react-refresh/reactRefresh'

declare module '@roots/bud-framework' {
  interface Framework {
    reactRefresh: reactRefresh
  }
  interface Modules {
    '@roots/bud-react': ReactExtension
  }
  interface CompilerPlugin {
    '@pmmmwh/react-refresh-webpack-plugin': ReactRefreshExtension
  }
}
