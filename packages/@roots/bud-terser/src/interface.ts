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

  export namespace Framework.Terser {
    export type Configure = (
      options: Framework.Terser.Options,
    ) => Framework

    export type Options = TerserPluginOptions
  }
}
