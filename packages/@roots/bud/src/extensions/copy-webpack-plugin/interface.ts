import {Container, Framework, Module} from '@roots/bud-framework'
import {CopyPluginOptions} from './typings'
import {WebpackPluginInstance} from 'webpack/types'

/**
 * @extends @roots/bud-framework
 */
declare module '@roots/bud-framework' {
  namespace Framework.Hooks {
    namespace Extension {
      interface Definitions {
        'copy-webpack-plugin': CopyWebpackPlugin
      }
    }
  }

  interface Framework {
    /**
     * ## assets  [💁 Fluent]
     *
     * Copy static assets during compilation.
     *
     * You may specify paths with a string literal or glob pattern.
     *
     * ### Usage
     *
     * **Copy src/images to dist/images**
     *
     * ```js
     * app.assets(['src/images'])
     * ```
     */
    assets: Framework.Api.Assets
  }

  namespace Framework.Api {
    type Assets = (this: Framework, from: string[]) => Framework
  }
}

/**
 * @interface CopyWebpackPlugin
 * @description Wrapper for copy-webpack-plugin
 */
export interface CopyWebpackPlugin extends Module {
  /**
   * @property {string} name
   * @description the name of the module
   */
  name: 'copy-webpack-plugin' &
    Module.Name &
    keyof Framework.Hooks.Extension.Definitions

  /**
   * @function options
   * @description Function returning initial copy-webpack-plugin options
   */
  options: () => CopyPluginOptions

  /**
   * @function api
   * @description Function returning object to be bound to bud.assets
   */
  api: () => {
    assets: Framework.Api.Assets
  }

  /**
   * @function make
   * @description Function returning instantiated webpack plugin
   */
  make: (
    options: Container<CopyPluginOptions>,
  ) => WebpackPluginInstance

  /**
   * @function when
   * @description Determines if plugin should be utilized in build.
   */
  when: (
    _app: Framework,
    options: Container<CopyPluginOptions>,
  ) => boolean
}
