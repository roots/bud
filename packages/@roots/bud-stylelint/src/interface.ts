import {Plugin} from '@roots/bud-framework'
import StylelintPlugin from 'stylelint-webpack-plugin'

export type Extension = Plugin<
  StylelintPlugin,
  {[key: string]: any}
>

declare module '@roots/bud-framework' {
  interface Framework {
    /***
     * Configure stylelint
     */
    stylelint: Stylelint.Config
  }

  namespace Stylelint {
    type Options = any
    type Config = (options: Stylelint.Options) => Framework
  }

  namespace Framework {
    interface Extensions {
      'stylelint-webpack-plugin': Extension
    }
  }
}
