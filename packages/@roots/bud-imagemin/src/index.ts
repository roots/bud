import {
  Framework,
  Module,
  WebpackPlugin,
} from '@roots/bud-framework'
import ImageMinimizerPlugin, {
  PluginOptions,
} from 'image-minimizer-webpack-plugin/types'

import {Config} from './Config'
import {extension} from './imagemin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-imagemin': Imagemin.Extension
      'image-minimizer-webpack-plugin': Imagemin.Plugin
    }
  }

  interface Framework {
    /**
     * Manage image minimizer plugins and options
     */
    imagemin: Imagemin.Config
  }

  interface Extensions {
    '@roots/bud-imagemin'?: Imagemin.Extension
  }
}

export namespace Imagemin {
  export interface Extension extends Module {
    name: '@roots/bud-imagemin'
  }

  export interface Plugin
    extends WebpackPlugin<ImageMinimizerPlugin, PluginOptions> {
    name: 'image-minimizer-webpack-plugin'
  }

  export type ImageminPlugin = [string, any]

  export interface Config {
    /**
     * Configure imagemin plugins
     */
    plugins(plugins: Array<ImageminPlugin>): Framework
  }
}

export const {name, api, register, boot} = extension
export {Config, WebpackPlugin}
