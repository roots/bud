import '@roots/bud-babel'

import {ReactExtension} from './extension'
import {ReactRefreshExtension} from './react-refresh/extension'
import {reactRefresh} from './react-refresh/reactRefresh'

declare module '@roots/bud-framework' {
  interface Bud {
    reactRefresh: reactRefresh
  }

  interface Modules {
    '@roots/bud-react': ReactExtension
  }

  interface Modules {
    '@pmmmwh/react-refresh-webpack-plugin': ReactRefreshExtension
  }
}
