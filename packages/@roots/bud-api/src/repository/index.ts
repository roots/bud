/**
 * @module @roots/bud-api
 */

import type {
  Framework,
  Module,
  Server,
} from '@roots/bud-framework'
import type {GlobTask} from 'globby'
import type Webpack from 'webpack'

/* eslint-disable import/export */

/**
 * @interface Repository
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
   */
  persist: Repository.Persist

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
   * Alias
   *
   * {@link Repository.alias}
   */
  export type Alias = (
    this: Framework,
    alias: Webpack.Configuration['resolve']['alias'],
  ) => Framework

  /**
   * Config
   *
   * {@link Repository.config}
   */
  export type Config = (config?: any) => Framework

  /**
   * Define
   *
   * {@link Repository.define}
   */
  export type Define = (
    this: Framework,
    values: Webpack.DefinePlugin['definitions'],
  ) => Framework

  /**
   * Dev
   *
   * {@link Repository.dev}
   */
  export type Dev = (
    this: Framework,
    config?: Server.Configuration,
  ) => Framework

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
   * Externals
   *
   * {@link Repository.externals}
   */
  export type Externals = (
    externals: Webpack.Configuration['externals'],
  ) => Framework

  /**
   * Minimize
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
   * Watch
   *
   * {@link Repository.watch}
   */
  export type Watch = (
    files: Server.Configuration['watch']['files'],
    options?: Server.Configuration['watch']['options'],
  ) => Framework
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
