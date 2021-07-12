import {Plugin} from '@roots/bud-framework'
import StylelintPlugin from 'stylelint-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      'stylelint-webpack-plugin': Plugin<
        StylelintPlugin,
        {[key: string]: any}
      >
    }
  }
}
