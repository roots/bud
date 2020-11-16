import Framework from '@roots/bud-typings'
import {Bud as Core} from '@roots/bud-framework'

import * as api from '@roots/bud-api'

export class Base extends Core
  implements Framework.Bud.Contract {
  /**
   * ## bud.config [🍱 _Container_]
   *
   * Webpack configuration settings
   *
   * [🔗 Documentation on bud.config](#)
   * [🔗 Documentation on containers](#)
   */
  config: Framework.Container

  /**
   * ## bud.args [🍱 _Container_]
   *
   * Collection of the arguments passed to the Framework and their values.
   *
   * [🔗 Documentation on bud.args](#)
   * [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * #### Flags
   *
   * ```sh
   * $ bud build --html
   * ```
   *
   * ```js
   * bud.args.has('html') // => true
   * ```
   *
   * #### Values
   *
   * ```sh
   * $ bud build --html dist/index.html
   * ```
   *
   * ```js
   * bud.args.get('html') // => 'dist/index.html'
   * ```
   *
   * #### Arrayed
   *
   * ```sh
   * $ bud build --bento uni rainbow edamame
   * # or
   * $ bud build --bento uni --bento rainbow --bento edamame
   * ```
   *
   * ```js
   * bud.args.get('bento') // => ['uni', 'rainbow', 'edamame']
   * ```
   */
  args: Framework.Container

  /**
   * ## bud.features [🍱 _Container_]
   *
   * Collection of feature flags each indicating whether or not a
   * particular feature is enabled or disabled.
   *
   * [🔗 Documentation on bud.features](#)
   * [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * **Get the features store**
   *
   * ```js
   * bud.features.getStore() // returns all the features as a `k => v` obj.
   * ```
   *
   * **Check if a given feature is enabled**
   *
   * ```js
   * bud.features.enabled('minify') // `true` if `minify` flag is on
   * ```
   *
   * **Toggle a feature**
   *
   * ```js
   * bud.features.set('gzip', false) // disable `gzip` feature flag
   * ```
   */
  features: Framework.Container

  /**
   * ## bud.patterns [🍱 _Container_]
   *
   * Collection of common RegExp objects. The advantage of using them in
   * a container object is that they can be easily redefined by extensions.
   * [🔗 Documentation on bud.patterns](#) [🔗 Documentation on containers](#)
   *
   * ### Usage
   *
   * **Get a regular expression matching files with `.js` extension**
   *
   * ```js
   * bud.patterns.get('js')
   * ```
   *
   * **Redefine a regular expression**
   *
   * ```js
   * bud.patterns.set('cssModule', /\.module\.css$/)
   * ```
   */
  patterns: Framework.Container

  /**
   * ## bud.cli
   *
   * The CLI interface also exposes methods for displaying
   * configuration progress, reports and errors.  [🔗 Documentation](#)
   */
  cli: Framework.CLI.Runner

  /**
   * ## bud.build
   *
   * Webpack configuration builder class. [🔗 Documentation](#)
   */
  build: Framework.Build.Contract

  /**
   * ## bud.cache
   *
   * Cache controller class. [🔗 Documentation](#)
   */
  cache: Framework.Cache.Contract

  /**
   * ## bud.env [🍱 _Container_]
   *
   * Container for definitions founds in the application `.env` file [🔗 Documentation](#)
   *
   * ### Usage
   * ```js
   * bud.env.get('APP_NAME')
   * ```
   */
  env: Framework.Env.Contract

  /**
   * ## bud.hooks
   *
   * Bud provides a system of 'hooks' to expose values
   * for easier modification.  [🔗 Documentation](#)
   *
   * ### Usage
   *
   * ####  Add a new entry to the `webpack.externals` configuration:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.externals',
   *   externals => ({
   *     ...externals,
   *     $: 'jquery',
   *   }),
   * )
   * ```
   *
   * #### Change the `webpack.output.filename` format:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.output.filename',
   *   () => '[name].[hash:4]',
   * )
   * ```
   *
   * #### Replace the regular expression used for CSS modules:
   *
   * ```js
   * bud.hooks.on(
   *   'webpack.module.rules.oneOf.css.test',
   *   () => /\.css$/,
   * )
   * ```
   */
  hooks: Framework.Hooks.Contract

  /**
   * ## bud.extensions
   *
   * Bud extension controller class. [🔗 Documentation](#)
   */
  extensions: Framework.Extensions.Contract

  /**
   * ## bud.compiler
   *
   * Webpack compilation controller class. [🔗 Documentation](#)
   */
  compiler: Framework.Compiler.Contract

  /**
   * ## bud.server
   *
   * Express application server used for development. [🔗 Documentation](#)
   */
  server: Framework.Server.Contract

  /**
   * ## bud.serverConfig [🍱 _Container_]
   *
   * Config store for the `bud.server` instance. You might
   * find it easier to do light configuration using
   * the `bud.dev` function. [🔗 Documentation](#)
   */
  serverConfig: Framework.Container

  /**
   * Setup FS abstractions.
   * @ignore
   */
  public disks(): this {
    this.fs.setBase(process.cwd())

    this.makeDisk('project', this.fs.base)

    this.makeDisk('@roots', '../../..')

    return this
  }

  /**
   * Register containers and api methods (static)
   * @ignore
   */
  public register(): this {
    this.registry
      .getEntries('containers')
      .map(
        ([name, repo]: [string, Framework.Index<unknown>]) => {
          this[name] = this.makeContainer({...repo})
        },
      )

    Object.keys(api).map(fnName => {
      this[fnName] = this[fnName].bind(this)
    })

    return this
  }

  /**
   * Register parts of the application that
   * might rely on having container access (dynamic)
   * @ignore
   */
  public boot(): this {
    this.args.has('mode')
      ? this.mode.set(this.args.get('mode'))
      : this.mode.set('none')

    this.registry
      .getEntries('loaders')
      .map((args: [string, Framework.Build.Loader]) => {
        this.build.setLoader(...args)
      })

    this.registry
      .getEntries('items')
      .map((args: [string, Framework.Item.Module]) => {
        this.build.setItem(...args)
      })

    this.registry
      .getEntries('rules')
      .map((args: [string, Framework.Rule.Module]) => {
        this.build.setRule(...args)
      })

    this.registry
      .getEntries('extensions')
      .map((args: [string, Framework.Extension.Contract]) => {
        this.extensions.set(...args)
      })

    return this
  }
}
