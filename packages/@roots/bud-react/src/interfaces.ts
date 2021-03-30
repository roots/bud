import '@roots/bud-framework'
import '@roots/bud-babel'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

declare module '@roots/bud-framework' {
  interface Framework {
    reactRefresh(options: ReactRefreshPluginOptions): Framework
  }

  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@pmmmwh/react-refresh-webpack-plugin': any
    }
  }
}
