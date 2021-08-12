import {WebpackPlugin} from '@roots/bud-framework'
import StylelintPlugin from 'stylelint-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      'stylelint-webpack-plugin': Stylelint.Extension
    }

    namespace Stylelint {
      type Extension = WebpackPlugin<
        StylelintPlugin,
        {[key: string]: any}
      >
    }
  }
}
