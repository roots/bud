/**
 * @module @roots/bud-api
 */

import type {
  Framework,
  Module,
  Server,
} from '@roots/bud-framework'
import type {GlobTask} from 'globby'
import type {Options as HtmlOptions} from 'html-webpack-plugin'
import type Webpack from 'webpack'

/* eslint-disable import/export */

/**
 * @interface Repository
 *
 * {@link Framework.Api['repository']}
 */
interface Repository {
  /**
   * alias
   *
   * Register shorthand for resolving modules
   * using webpack aliases. Useful for
   * situations that may otherwise require
   * brittle relative paths.
   *
   * @usage
   *
   * ```js
   * app.alias({
   *   '@scripts': app.path('src', 'scripts'),
   * })
   * ```
   *
   * {@link alias}
   * {@link Repository.Alias}
   */
  alias: Repository.Alias

  /**
   * config
   *
   * Modify bud's baseline config.
   *
   * Values defined in this function are more
   * likely to be overwritten by framework hooks
   *
   * @usage
   *
   * ```js
   * app.config({
   *   theme: {
   *     colors: {
   *       foreground: '#FFFFFF',
   *       faded: '#6C758F',
   *       primary: '#545DD7',
   *       primaryAlt: '#663399',
   *       error: '#dc3545',
   *       errorAlt: '#b22222',
   *       warning: '#FF611A',
   *       success: '#46D46A',
   *       accent: '#ff69b4',
   *       flavor: '#78C5D7',
   *     },
   *   },
   * })
   * ```
   *
   * {@link Repository.Config}
   */
  config: Repository.Config

  /**
   * define
   *
   * Define application variables.
   *
   * @usage
   *
   * ```ts file='bud.config.js'
   * app.define({
   *   APP_NAME: 'My Application',
   * })
   * ```
   *
   * {@link Repository.Define}
   */
  define: Repository.Define

  /**
   * dev
   *
   * Configure development server.
   *
   * @usage
   *
   * ```js
   * app.dev({
   *   host: 'my-local-site.example',
   *   port: 5000,
   * })
   * ```
   *
   * {@link Repository.Dev}
   */
  dev: Repository.Dev

  /**
   * devtool
   *
   * Enable and configure sourcemaps using any of [Webpack's
   * devtool utilities](https://webpack.js.org/configuration/devtool/).
   *
   * @usage
   *
   * ```js
   * app.devtool('inline-cheap-module-source-map')
   * ```
   *
   * {@link Repository.Devtool}
   */
  devtool: Repository.Devtool

  /**
   * entry
   *
   * Generate application entrypoints from source asset paths.
   *
   * @description
   *
   * **Globbing**
   *
   * Uses [fast-glob](https://git.io/JkGbw) syntax.
   *
   * **Supported patterns**
   *
   * - `*` matches any number of characters, but not `/`
   * - `?` matches a single character, but not `/`
   * - `**` matches any number of characters, including `/`,
   *   as long as it's the only thing in a path part
   * - `{}` allows for a comma-separated list  of "or" expressions
   * - `!` at the beginning of a pattern will negate the match
   *
   * @usage
   *
   * Create an entrypoint from a single file:
   *
   * ```js
   * app.entry('app', 'app.js')
   * ```
   *
   * Create an entrypoint from multiple files:
   *
   * ```js
   * app.entry('app', ['js/app.js', 'css/app.css'])
   * ```
   *
   * Create an entrypoint comprised of all js assets:
   *
   * ```js
   * app.entry('app', '*.js')
   * ```
   *
   * You may create more than one entrypoint using object syntax:
   *
   * ```js
   * app.entry({
   *   scripts: '*.js',
   *   styles: ['*.css', '*.scss'],
   * })
   * ```
   *
   * Declare entrypoint dependencies:
   *
   * ```js
   * app.entry({
   *  react: {
   *    import: ['react', 'react-dom']
   *  },
   *  app: {
   *    import: ['app.js'],
   *    dependOn: ['react'],
   *  },
   * })
   * ```
   *
   * {@link Repository.Entry}
   */
  entry: Repository.Entry

  /**
   * experiments
   *
   * Configure experimental webpack options.
   *
   * @usage
   *
   * ```js
   * bud.experiments({
   *  lazyCompilation: true,
   * })
   * ```
   *
   * {@link Repository.Experiments}
   */
  experiments: Repository.Experiments

  /**
   * externals
   *
   * Specify a non-standard resolution strategy for modules
   * with a matching name.
   *
   * @usage
   *
   * ```js
   * bud.externals({
   *   'jQuery': 'window.jquery',
   * })
   * ```
   *
   * {@link Repository.Externals}
   */
  externals: Repository.Externals

  /**
   * hash
   *
   * Enable filename hashing of built assets.
   *
   * @usage
   *
   * ```js
   * bud.hash()
   * ```
   *
   * {@link Repository.Hash}
   */
  hash: Repository.Hash

  /**
   * minimize
   *
   * Enables minification of built assets.
   *
   * @usage
   *
   * Enable:
   *
   * ```js
   * bud.minimize()
   * ```
   *
   * Explicitly disable:
   *
   * ```js
   * bud.minimize(false)
   * ```
   *
   * Explicitly enable:
   *
   * ```js
   * bud.minimize(true)
   * ```
   *
   * {@link Repository.Minimize}
   */
  minimize: Repository.Minimize

  /**
   * persist
   *
   * Cache webpack builds to the filesystem.
   *
   * @usage
   *
   * ```js
   * app.persist({
   *   type: 'memory',
   * })
   * ```
   *
   * {@link Repository.Persist}
   */
  persist: Repository.Persist

  /**
   * provide
   *
   * Makes a variable/module available throughout the entire
   * application without needing to import it explicitly.
   *
   * @usage
   *
   * ```js
   * bud.provide({
   *   jquery: '$',
   * })
   * ```
   *
   * {@link Repository.Provide}
   */
  provide: Repository.Provide

  /**
   * proxy
   *
   * Set proxy settings for the development server.
   *
   * By default it proxies whatever is running on localhost on port 8000.
   *
   * @usage
   *
   * Enable:
   *
   * ```js
   * bud.proxy()
   * ```
   *
   * Disable:
   *
   * ```js
   * bud.proxy({enabled: false})
   * ```
   *
   * Specify host and port:
   *
   * ```js
   * bud.proxy({
   *  host: 'example.test',
   *  port: 3000,
   * })
   * ```
   *
   * {@link Repository.Proxy}
   */
  proxy: Repository.Proxy

  /**
   * publicPath
   *
   * By default it is assumed that assets are served from webroot (`/`).
   * You can use this method to replace this value for apps  served from
   * a subdirectory.
   *
   * @usage
   *
   * Set the default path for a [@roots/sage project](https://github.com/roots/sage):
   *
   * ```js
   * bud.publicPath('/app/themes/sage/dist')
   * ```
   *
   * {@link Repository.PublicPath}
   */
  publicPath: Repository.PublicPath

  /**
   * run
   *
   * Run the build
   *
   * @usage
   *
   * ```js
   * bud.run()
   * ```
   *
   * {@link Repository.Run}
   */
  run: Repository.Run

  /**
   * runtime
   *
   * Generate a runtime chunk intended to be inlined on the page.
   *
   * Useful for code splitting and dynamic imports.
   *
   * @usage
   *
   * ```js
   * bud.runtime()
   * ```
   */
  runtime: Repository.Runtime

  /**
   * setPath
   *
   * Set a directory. The project directory should be an absolute path.
   * All other directories should be relative (src, dist, etc.)
   *
   * @usage
   *
   * ```js
   * bud.setPath('src', 'custom/src')
   * ```
   *
   * {@link Repository.SetPath}
   */
  setPath: Repository.SetPath

  /**
   * setPublicPath
   *
   * By default it is assumed that assets are served from webroot (`/`).
   * You can use this method to replace this value for apps served from
   * a subdirectory.
   *
   * @usage
   *
   * Set the default path using a string
   *
   * ```js
   * app.setPublicPath('/app/themes/sage/dist')
   * ```
   *
   * Set the publicPath using a function.
   *
   * ```js
   * app.setPublicPath(publicPath => {
   *   return `web/assets/${publicPath}`
   * })
   * ```
   *
   * {@link Repository.SetPublicPath}
   */
  setPublicPath: Repository.SetPublicPath

  /**
   * splitChunks
   *
   * Useful for bundling vendor modules separately from application code.
   *
   * @usage
   *
   * ```js
   * bud.splitChunks({
   *  chunks: 'all',
   * })
   * ```
   *
   * {@link Repository.SplitChunks}
   */
  splitChunks: Repository.SplitChunks

  /**
   * template
   *
   * Enable and/or configure a generated HTML template
   *
   * @usage
   *
   * ```js
   * app.template({
   *   enabled: true, // default: true
   *   template: 'public/index.html',
   *   replace: {
   *     APP_NAME: name,
   *     APP_DESCRIPTION: description,
   *     PUBLIC_URL: app.env.get('PUBLIC_URL'),
   *   },
   * })
   * ```
   */
  template: Repository.Template

  /**
   * use
   *
   * Register an extension or set of extensions
   *
   * @usage
   *
   * Add packaged bud extensions:
   *
   * ```js
   * bud.use([
   *   require('@roots/bud-babel'),
   *   require('@roots/bud-react'),
   * ])
   * ```
   *
   * Add an extension inline (also works with an array of extensions):
   *
   * ```js
   * bud.use({
   *  name: 'my-webpack-plugin',
   *  make: () => new MyWebpackPlugin(),
   * })
   * ```
   *
   * Add a webpack plugin inline (also work with an array of plugins):
   *
   * ```js
   * bud.use(new MyWebpackPlugin())
   * ```
   *
   * {@link Repository.Use}
   */
  use: Repository.Use

  /**
   * watch
   *
   * Configure the list of files that, when modified,
   * will force the browser to reload (even in hot mode).
   *
   * @usage
   *
   * ```js
   * app.watch(['templates/*.html'])
   * ```
   *
   * {@link Repository.Watch}
   */
  watch: Repository.Watch
}

/**
 * @namespace Repository
 */
namespace Repository {
  /**
   * @interface Alias
   *
   * {@link Repository.alias}
   */
  export interface Alias {
    (
      this: Framework,
      alias: Webpack.Configuration['resolve']['alias'],
    ): Framework
  }

  /**
   * @interface Config
   *
   * {@link Repository.config}
   */
  export interface Config {
    (this: Framework, config?: any): Framework
  }

  /**
   * @interface Define
   *
   * {@link Repository.define}
   */
  export interface Define {
    (
      this: Framework,
      values: Webpack.DefinePlugin['definitions'],
    ): Framework
  }

  /**
   * @interface Dev
   *
   * {@link Repository.dev}
   */
  export interface Dev {
    (this: Framework, config?: Server.Configuration): Framework
  }

  /**
   * @interface Devtool
   *
   * {@link Repository.devtool}
   */
  export interface Devtool {
    (
      this: Framework,
      devtool?: Webpack.Configuration['devtool'],
    ): Framework
  }

  /**
   * @interface Entry
   *
   * Single entrypoint
   *
   * {@link Repository.entry}
   */
  export interface Entry {
    (
      this: Framework,
      name: string,
      entrypoint: Entry.Value,
    ): Framework
  }

  /**
   * @interface Entry
   *
   * Object entrypoint
   *
   * {@link Repository.entry}
   */
  export interface Entry {
    (this: Framework, entrypoints: Entry.Input): Framework
  }

  /**
   * @namespace Entry
   */
  export namespace Entry {
    export interface Object {
      import?: string[]
      dependsOn?: string[]
    }

    export interface Input {
      [k: string]:
        | Object
        | Object['import']
        | GlobTask['pattern']
    }

    export type Value =
      | GlobTask['pattern']
      | Array<GlobTask['pattern']>
  }

  /**
   * @interface Experiments
   *
   * {@link Repository.experiments}
   */
  export interface Experiments {
    (
      this: Framework,
      settings: Webpack.Configuration['experiments'],
    ): Framework
  }

  /**
   * @interface Externals
   *
   * {@link Repository.externals}
   */
  export interface Externals {
    (
      this: Framework,
      externals: Webpack.Configuration['externals'],
    ): Framework
  }

  /**
   * @interface Hash
   *
   * {@link Repository.hash}
   */
  export interface Hash {
    (this: Framework, enabled?: boolean): Framework
  }

  /**
   * @interface Minimize
   *
   * {@link Repository.minimize}
   */
  export interface Minimize {
    (enabled?: boolean): Framework
  }

  /**
   * @interface Persist
   *
   * {@link Repository.persist}
   */
  export interface Persist {
    (this: Framework, enabled?: boolean): Framework
  }

  /**
   * @interface Provide
   *
   * {@link Repository.provide}
   */
  export interface Provide {
    (this: Framework, packages?: Provide.Provided): Framework
  }

  /**
   * @namespace Provide
   */
  export namespace Provide {
    export interface Provided {
      [key: string]: string | string[]
    }
  }

  /**
   * @interface Proxy
   *
   * {@link Repository.proxy}
   */
  export interface Proxy {
    (
      this: Framework,
      config?: {
        /**
         * Explicity enable or disable proxy service
         */
        enabled?: boolean

        /**
         * Hostname of the proxy target
         */
        host?: Server.Configuration['proxy']['host']

        /**
         * Port of the proxy target
         */
        port?: Server.Configuration['proxy']['port']
      },
    ): Framework
  }

  /**
   * @interface PublicPath
   *
   * {@link Repository.publicPath}
   */
  export interface PublicPath {
    (this: Framework): string
  }

  /**
   * @interface Run
   *
   * {@link Repository.run}
   */
  export interface Run {
    (this: Framework): void
  }

  /**
   * @interface Runtime
   *
   * {@link Repository.runtime}
   */
  export interface Runtime {
    (
      this: Framework,
      runtime?: Webpack.Configuration['optimization']['runtimeChunk'],
    ): Framework
  }

  /**
   * @interface SetPath
   *
   * {@link Repository.setPath}
   */
  export interface SetPath {
    (this: Framework, name: any, path?: string): Framework
  }
  export interface SetPath {
    (this: Framework, paths: string[]): Framework
  }

  /**
   * @interface SetPublicPath
   *
   * {@link Repository.setPublicPath}
   */
  export interface SetPublicPath {
    (
      publicPath: string | ((publicPath: string) => string),
    ): Framework
  }

  /**
   * @interface SplitChunks
   *
   * {@link Repository.splitChunks}
   */
  export interface SplitChunks {
    (
      this: Framework,
      options?: Repository.SplitChunks.Options,
    ): Framework
  }

  /**
   * @namespace SplitChunks
   */
  export namespace SplitChunks {
    export type Options =
      Webpack.Configuration['optimization']['splitChunks']
  }

  /**
   * @interface Template
   *
   * {@link Repository.template}
   */
  export interface Template {
    (this: Framework, options?: Template.Options): Framework
  }

  /**
   * @namespace Template
   */
  export namespace Template {
    export interface Options extends HtmlOptions {
      /**
       * Explicitly enable or disable html templating.
       */
      enabled?: boolean

      /**
       * Path to an HTML template to use. If none is supplied
       * one is provided as a default.
       */
      template?: string

      /**
       * Template variable names are used as keys.
       * Each key is associated with a replacement value.
       */
      replace?: {
        [key: string]: string
      }
    }
  }

  /**
   * @interface Use
   *
   * {@link Repository.use}
   */
  export interface Use {
    (source: Use.Input): Framework
  }

  /**
   * @namespace Use
   */
  export namespace Use {
    export type Input = Module | Module[]
  }

  /**
   * @interface Watch
   *
   * {@link Repository.watch}
   */
  export interface Watch {
    (
      files: Server.Configuration['watch']['files'],
      options?: Server.Configuration['watch']['options'],
    ): Framework
  }
}

/**
 * @exports alias
 */
export {alias} from './alias'

/**
 * @exports config
 */
export {config} from './config'

/**
 * @exports define
 */
export {define} from './define'

/**
 * @exports dev
 */
export {dev} from './dev'

/**
 * @exports devtool
 */
export {devtool} from './devtool'

/**
 * @exports experiments
 */
export {experiments} from './experiments'

/**
 * @exports externals
 */
export {externals} from './externals'

/**
 * @exports entry
 */
export {entry} from './entry'

/**
 * @exports hash
 */
export {hash} from './hash'

/**
 * @exports minimize
 */
export {minimize} from './minimize'

/**
 * @exports persist
 */
export {persist} from './persist'

/**
 * @exports provide
 */
export {provide} from './provide'

/**
 * @exports proxy
 */
export {proxy} from './proxy'

/**
 * @exports publicPath
 */
export {publicPath} from './publicPath'

/**
 * @exports run
 */
export {run} from './run'

/**
 * @exports runtime
 */
export {runtime} from './runtime'

/**
 * @exports setPath
 */
export {setPath} from './setPath'

/**
 * @exports setPublicPath
 */
export {setPublicPath} from './setPublicPath'

/**
 * @exports splitChunks
 */
export {splitChunks} from './splitChunks'

/**
 * @exports template
 */
export {template} from './template'

/**
 * @exports use
 */
export {use} from './use'

/**
 * @exports watch
 */
export {watch} from './watch'

/**
 * @exports Repository
 */
export {Repository}
