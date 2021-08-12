import {Module, WebpackPlugin} from '@roots/bud-framework'
import ImageMinimizerPlugin, {
  PluginOptions,
} from 'image-minimizer-webpack-plugin/types'

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
    '@roots/bud-imagemin': Imagemin.Extension
  }

  namespace Imagemin {
    interface Extension extends Module {
      name: '@roots/bud-imagemin'
    }

    interface Plugin
      extends WebpackPlugin<
        ImageMinimizerPlugin,
        PluginOptions
      > {
      name: 'image-minimizer-webpack-plugin'
    }

    type ImageminPlugin = [string, any]

    interface Config {
      /**
       * Configure imagemin plugins
       */
      plugins(plugins: Array<ImageminPlugin>): Framework
    }
  }
}
