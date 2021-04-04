import '@roots/bud-babel'
import {Module} from '@roots/bud-framework'

import type {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

declare module '@roots/bud-framework' {
  export interface Framework {
    reactRefresh(options: ReactRefreshPluginOptions): Framework
  }

  export namespace Framework.Hooks.Extension {
    export interface Definitions {
      '@roots/bud-react': Module
      '@pmmmwh/react-refresh-webpack-plugin': Module
    }
  }
}
