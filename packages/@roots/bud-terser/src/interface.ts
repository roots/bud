import {Module} from '@roots/bud-framework'
import {TerserPluginOptions} from 'terser-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.terser  [💁 Fluent]
     *
     * Configure the minifier. [🔗 Documentation](#)
     *
     * For more information on options [see the
     * terser-webpack-plugin docs](https://webpack.js.org/plugins/terser-webpack-plugin/).
     */
    terser: Terser.Configure
  }

  namespace Terser {
    type Configure = (options: Options) => Framework
    type Options = TerserPluginOptions
  }

  namespace Framework {
    interface Extensions {
      'terser-webpack-plugin': Module
    }
  }
}
