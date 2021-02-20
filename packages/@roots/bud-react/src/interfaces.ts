import '@roots/bud'
import '@roots/bud-babel'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

declare module '@roots/bud' {
  export interface Bud {
    reactRefresh(
      this: Bud,
      options: ReactRefreshPluginOptions,
    ): Bud
  }
}
