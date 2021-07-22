import '@roots/bud-api'
import '@roots/bud-babel'

import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import {Module} from '@roots/bud-extensions'

declare module '@roots/bud-framework' {
  export interface Framework {
    reactRefresh(options: ReactRefreshPluginOptions): Framework
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-react': Module
      '@pmmmwh/react-refresh-webpack-plugin': Module
    }
  }
}
