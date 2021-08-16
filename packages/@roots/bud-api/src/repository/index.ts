import type {
  Framework,
  Module,
  Server,
} from '@roots/bud-framework'
import {globby} from '@roots/bud-support'
import type {Options as HtmlOptions} from 'html-webpack-plugin'
import type * as Webpack from 'webpack'

import alias from './alias'
import {assets} from './assets'
import {config} from './config'
import {define} from './define'
import {dev} from './dev'
import {devtool} from './devtool'
import {entry} from './entry'
import {experiments} from './experiments'
import {externals} from './externals'
import {hash} from './hash'
import minimize from './minimize'
import {persist} from './persist'
import {provide} from './provide'
import {proxy} from './proxy'
import {publicPath} from './publicPath'
import {run} from './run'
import {runtime} from './runtime'
import {setPublicPath} from './setPublicPath'
import {splitChunks} from './splitChunks'
import {template} from './template'
import {use} from './use'
import {watch} from './watch'

interface Repository {
  /**
   * Register shorthand for resolving modules using webpack aliases.
   *
   * @remarks
   * Useful for situations that may otherwise require brittle relative paths.
   *
   * @example
   * ```js
   * app.alias({
   *   '@scripts': app.path('src', 'scripts'),
   * })
   * ```
   */
  alias: Repository.Alias

  /**
   * Copy static assets during compilation.
   *
   * @remarks
   * You may specify paths with a string literal or glob pattern.
   *
   * @example
   * Copy **src/images** to **dist/images**
   *
   * ```js
   * app.assets(['src/images'])
   * ```
   */
  assets: Repository.Assets

  /**
   * Modify the {@link Framework Framework} baseline config.
   *
   * @remarks
   * Values defined in this function are more likely to be overwritten by {@link Framework Framework} hooks, etc.
   * If there is a more direct way to make your change it is better to not use this function.
   *
   * Still, this function provides utility for certain use cases.
   *
   * @example
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
   */
  config: Repository.Config

  /**
   * Define application variables.
   *
   * @example
   * ```ts file='bud.config.js'
   * app.define({
   *   APP_NAME: 'My Application',
   * })
   * ```
   */
  define: Repository.Define

  /**
   * Configure development server.
   *
   * @example
   * ```js
   * app.dev({
   *   host: 'my-local-site.example',
   *   port: 5000,
   * })
   * ```
   */
  dev: Repository.Dev

  /**
   * Enable and configure sourcemaps using any of [Webpack's
   * devtool utilities](https://webpack.js.org/configuration/devtool/).
   *
   * @example
   * ```js
   * app.devtool('inline-cheap-module-source-map')
   * ```
   */
  devtool: Repository.Devtool

  /**
   * Generate application entrypoints from source asset paths.
   *
   * @remarks
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
   * @example
   * Create an entrypoint from a single file:
   *
   * ```js
   * app.entry('app', 'app.js')
   * ```
   *
   * @example
   * Create an entrypoint from multiple files:
   *
   * ```js
   * app.entry('app', ['js/app.js', 'css/app.css'])
   * ```
   *
   * @example
   * Create an entrypoint comprised of all js assets:
   *
   * ```js
   * app.entry('app', '*.js')
   * ```
   *
   * @example
   * You may create more than one entrypoint using object syntax:
   *
   * ```js
   * app.entry({
   *   scripts: '*.js',
   *   styles: ['*.css', '*.scss'],
   * })
   * ```
   *
   * @example
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
   */
  entry: Repository.Entry

  /**
   * Configure experimental webpack options.
   *
   * @example
   * ```js
   * bud.experiments({
   *  lazyCompilation: true,
   * })
   * ```
   */
  experiments: Repository.Experiments

  /**
   * Specify a non-standard resolution strategy for modules
   * with a matching name.
   *
   * @example
   * ```js
   * bud.externals({
   *   'jQuery': 'window.jquery',
   * })
   * ```
   */
  externals: Repository.Externals

  /**
   * Enable filename hashing of built assets.
   *
   * @example
   * ```js
   * bud.hash()
   * ```
   */
  hash: Repository.Hash

  /**
   * Enables minification of built assets.
   *
   * @example
   * Enable:
   *
   * ```js
   * bud.minimize()
   * ```
   *
   * @example
   * Explicitly disable:
   *
   * ```js
   * bud.minimize(false)
   * ```
   *
   * @example
   * Explicitly enable:
   *
   * ```js
   * bud.minimize(true)
   * ```
   */
  minimize: Repository.Minimize

  /**
   * Cache webpack builds to the filesystem.
   *
   * @example
   * ```js
   * app.persist({
   *   type: 'memory',
   * })
   * ```
   */
  persist: Repository.Persist

  /**
   * Makes a variable/module available throughout the entire
   * application without needing to import it explicitly.
   *
   * @example
   * ```js
   * bud.provide({
   *   jquery: '$',
   * })
   * ```
   */
  provide: Repository.Provide

  /**
   * Set proxy settings for the development server.
   *
   * By default it proxies whatever is running on localhost on port 8000.
   *
   * @example
   * Enable:
   *
   * ```js
   * bud.proxy()
   * ```
   *
   * @example
   * Disable:
   *
   * ```js
   * bud.proxy({enabled: false})
   * ```
   *
   * @example
   * Specify host and port:
   *
   * ```js
   * bud.proxy({
   *  host: 'example.test',
   *  port: 3000,
   * })
   * ```
   */
  proxy: Repository.Proxy

  /**
   * By default it is assumed that assets are served from webroot (`/`).
   * You can use this method to replace this value for apps  served from
   * a subdirectory.
   *
   * @example
   * Set the default path for a [@roots/sage project](https://github.com/roots/sage):
   *
   * ```js
   * bud.publicPath('/app/themes/sage/dist')
   * ```
   */
  publicPath: Repository.PublicPath

  /**
   * Run the build
   *
   * @example
   * ```js
   * bud.run()
   * ```
   */
  run: Repository.Run

  /**
   * Generate a runtime chunk intended to be inlined on the page.
   *
   * Useful for code splitting and dynamic imports.
   *
   * @example
   * ```js
   * bud.runtime()
   * ```
   */
  runtime: Repository.Runtime

  /**
   * By default it is assumed that assets are served from webroot (`/`).
   * You can use this method to replace this value for apps served from
   * a subdirectory.
   *
   * @example
   * Set the default path using a string
   *
   * ```js
   * app.setPublicPath('/app/themes/sage/dist')
   * ```
   *
   * @example
   * Set the publicPath using a function.
   *
   * ```js
   * app.setPublicPath(publicPath => {
   *   return `web/assets/${publicPath}`
   * })
   * ```
   */
  setPublicPath: Repository.SetPublicPath

  /**
   * Useful for bundling vendor modules separately from application code.
   *
   * @example
   * ```js
   * bud.splitChunks({
   *  chunks: 'all',
   * })
   * ```
   */
  splitChunks: Repository.SplitChunks

  /**
   * Enable and/or configure a generated HTML template
   *
   * @example
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
   * Register an extension or set of extensions
   *
   * @example
   * Add packaged bud extensions:
   *
   * ```js
   * bud.use([
   *   require('@roots/bud-babel'),
   *   require('@roots/bud-react'),
   * ])
   * ```
   *
   * @example
   * Add an extension inline (also works with an array of extensions):
   *
   * ```js
   * bud.use({
   *  name: 'my-webpack-plugin',
   *  make: () => new MyWebpackPlugin(),
   * })
   * ```
   *
   * @example
   * Add a webpack plugin inline (also work with an array of plugins):
   *
   * ```js
   * bud.use(new MyWebpackPlugin())
   * ```
   */
  use: Repository.Use

  /**
   * Configure the list of files that, when modified,
   * will force the browser to reload (even in hot mode).
   *
   * @example
   * ```js
   * app.watch(['templates/*.html'])
   * ```
   */
  watch: Repository.Watch
}

namespace Repository {
  export interface Alias {
    (
      this: Framework,
      alias: Webpack.Configuration['resolve']['alias'],
    ): Framework
  }

  export interface Assets {
    (this: Framework, from: string[]): Framework
  }

  export interface Config {
    (this: Framework, config?: any): Framework
  }

  export interface Define {
    (
      this: Framework,
      values: Webpack.DefinePlugin['definitions'],
    ): Framework
  }

  export interface Dev {
    (this: Framework, config?: Server.Configuration): Framework
  }

  export interface Devtool {
    (
      this: Framework,
      devtool?: Webpack.Configuration['devtool'],
    ): Framework
  }

  export interface Entry {
    (
      this: Framework,
      name: string,
      entrypoint: Entry.Value,
    ): Framework
  }

  export interface Entry {
    (this: Framework, entrypoints: Entry.Input): Framework
  }

  export namespace Entry {
    export interface Object {
      import?: string[]
      dependsOn?: string[]
    }

    export interface Input {
      [k: string]:
        | Object
        | Object['import']
        | globby.GlobTask['pattern']
    }

    export type Value =
      | globby.GlobTask['pattern']
      | Array<globby.GlobTask['pattern']>
  }

  export interface Experiments {
    (
      this: Framework,
      settings: Webpack.Configuration['experiments'],
    ): Framework
  }

  export interface Externals {
    (
      this: Framework,
      externals: Webpack.Configuration['externals'],
    ): Framework
  }

  export interface Hash {
    (this: Framework, enabled?: boolean): Framework
  }

  export interface Minimize {
    (enabled?: boolean): Framework
  }

  export interface Persist {
    (this: Framework, enabled?: boolean): Framework
  }

  export interface Provide {
    (this: Framework, packages?: Provide.Provided): Framework
  }

  export namespace Provide {
    export interface Provided {
      [key: string]: string | string[]
    }
  }

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

  export interface PublicPath {
    (this: Framework): string
  }

  export interface Run {
    (this: Framework): void
  }

  export interface Runtime {
    (
      this: Framework,
      runtime?: Webpack.Configuration['optimization']['runtimeChunk'],
    ): Framework
  }

  export interface SetPublicPath {
    (
      publicPath: string | ((publicPath: string) => string),
    ): Framework
  }

  export interface SplitChunks {
    (
      this: Framework,
      options?: Repository.SplitChunks.Options,
    ): Framework
  }

  export namespace SplitChunks {
    export type Options =
      Webpack.Configuration['optimization']['splitChunks']
  }

  export interface Template {
    (this: Framework, options?: Template.Options): Framework
  }

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

  export interface Use {
    (source: Use.Input): Framework
  }

  export namespace Use {
    export type Input = Module | Module[]
  }

  export interface Watch {
    (
      files: Server.Configuration['watch']['files'],
      options?: Server.Configuration['watch']['options'],
    ): Framework
  }
}

const Repository = {
  alias,
  assets,
  config,
  define,
  dev,
  devtool,
  entry,
  experiments,
  externals,
  hash,
  minimize,
  persist,
  provide,
  proxy,
  publicPath,
  run,
  runtime,
  setPublicPath,
  splitChunks,
  template,
  use,
  watch,
}

export default Repository
