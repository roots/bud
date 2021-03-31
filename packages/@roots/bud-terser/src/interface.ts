import type {TerserPluginOptions} from 'terser-webpack-plugin'

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
    terser: Framework.Terser.Configure
  }

  namespace Framework.Terser {
    type Configure = (
      options: Framework.Terser.Options,
    ) => Framework

    type Options = TerserPluginOptions
  }

  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-terser': Framework.Module
      'terser-webpack-plugin': Framework.Module
    }
  }
}
