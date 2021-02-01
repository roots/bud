import '@roots/bud'
import type {TerserPluginOptions} from 'terser-webpack-plugin'

declare module '@roots/bud' {
  interface Bud {
    /**
     * ## bud.terser  [💁 Fluent]
     *
     * Configure the minifier. [🔗 Documentation](#)
     *
     * For more information on options [see the
     * terser-webpack-plugin docs](https://webpack.js.org/plugins/terser-webpack-plugin/).
     */
    terser: Bud.Terser.Configure
  }

  export namespace Bud.Terser {
    export type Configure = (
      this: Bud,
      options: Bud.Terser.Options,
    ) => Bud

    export type Options = TerserPluginOptions
  }
}
