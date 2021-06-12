import {
  Module as BudExtension,
  Plugin as BudWebpackPlugin,
} from '@roots/bud-framework'
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
     * ## imagemin
     *
     * Modify image minimizer options.
     */
    imagemin: Imagemin.Config
  }

  namespace Imagemin {
    interface Extension extends BudExtension {
      name: '@roots/bud-imagemin'
      api: (app: Framework) => {
        imagemin: Config
      }
    }

    interface Plugin
      extends BudWebpackPlugin<
        ImageMinimizerPlugin,
        PluginOptions
      > {
      name: 'image-minimizer-webpack-plugin'
    }

    type ImageminPlugin = [string, any]

    interface Config {
      /**
       * ## Configure imagemin plugins
       */
      plugins(plugins: Array<ImageminPlugin>): Framework
    }
  }
}
