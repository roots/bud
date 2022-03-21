import {Extension} from '@roots/bud-framework'
import TerserPlugin from 'terser-webpack-plugin/types'
import {terser} from './terser.api'

declare module '@roots/bud-framework' {
  interface Framework {
    terser: terser
  }

  interface Modules {
    '@roots/bud-terser': Terser.Extension
  }

  namespace Terser {
    export type Options = TerserPlugin.BasePluginOptions

    export type Plugin = TerserPlugin

    export interface Extension
      extends Extension.CompilerPlugin<
        TerserPlugin,
        TerserPlugin.BasePluginOptions
      > {
      name: '@roots/bud-terser'
      options: (app: Framework) => Terser.Options
    }
  }
}
