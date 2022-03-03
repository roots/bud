import {Container} from '@roots/container'
import {WatchOptions} from 'chokidar'
import {ValueOf} from 'type-fest'
import {Configuration, RuleSetRule} from 'webpack'

import {Framework, Modules, Plugins, Service} from './'
import {EntryObject} from './entry'
import {PluginInstance} from './Extensions/Extension'
import * as Server from './Server'

/**
 * Assign and filter callback to values.
 *
 * @example
 * Add a new entry to the `webpack.externals` configuration:
 *
 * ```ts
 * hooks.on(
 *   'build/externals',
 *   externals => ({
 *     ...externals,
 *     $: 'jquery',
 *   }),
 * )
 * ```
 *
 * @example
 * Change the `webpack.output.filename` format:
 *
 * ```ts
 * hooks.on(
 *   'build.output.filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 *
 * @public
 */
export interface Hooks extends Service {
  /**
   * Register a function to modify a filtered value
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   */
  on<T extends keyof Hooks.Map & string>(
    id: T,
    callback?: ((param?: Hooks.Map[T]) => Hooks.Map[T]) | Hooks.Map[T],
  ): Framework

  /**
   * Register an async function to filter a value.
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   */
  async<T extends keyof Hooks.AsyncMap & string>(
    id: T,
    callback?: (param?: Hooks.AsyncMap[T]) => Promise<Hooks.AsyncMap[T]>,
  ): Framework

  /**
   * Filter a value
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   */
  filter<T extends keyof Hooks.Map & string>(
    id: T,
    value?: Hooks.Map[T] | ((value?: Hooks.Map[T]) => Hooks.Map[T]),
  ): Hooks.Map[T]

  /**
   * Async version of hook.filter
   *
   * @remarks
   * Hooks are processed as a waterfall.
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   */
  filterAsync<T extends keyof Hooks.AsyncMap & string>(
    id: T,
    value?:
      | Hooks.AsyncMap[T]
      | ((param?: Hooks.AsyncMap[T]) => Promise<Hooks.AsyncMap[T]>),
  ): Promise<Hooks.AsyncMap[T]>

  /**
   * Event
   *
   * @public
   */
  fire<T extends keyof Hooks.Events & string>(id: T): Promise<Framework>

  /**
   * Action (on event)
   *
   * @public
   */
  action<T extends keyof Hooks.Events & string>(
    id: T,
    ...action: Array<(app: Framework) => Promise<unknown>>
  ): Framework
}

/**
 * @public
 */
export namespace Hooks {
  /**
   * Hook signature
   *
   * @public
   */
  export type Hook<T extends keyof Map & string> =
    | ((value?: T) => Map[T])
    | ((value?: T) => Partial<Map[T]>)
    | Map[T]
    | Partial<Map[T]>

  /**
   * Asyncronous hooks map
   *
   * @public
   */
  export interface AsyncMap {
    [`build`]: Record<string, any>
    [`build.entry`]: Record<string, EntryObject>
    [`build.plugins`]: Record<string, any>
    [`build.resolve`]: Configuration['resolve']
    [`build.resolve.alias`]: Configuration[`resolve`][`alias`]
    [`build.resolve.modules`]: Configuration[`resolve`][`modules`]
  }

  /**
   * Syncronous hooks map
   *
   * @public
   */
  export interface Map
    extends Server.Middleware.Middleware<`options`>,
      Server.Middleware.Middleware<`factory`> {
    [`build.bail`]: boolean
    [`build.cache`]: any
    [`build.cache.buildDependencies`]: Record<string, Array<string>>
    [`build.cache.cacheDirectory`]: string
    [`build.cache.version`]: string
    [`build.cache.type`]: `memory` | `filesystem`
    [`build.cache.managedPaths`]: Array<string>
    [`build.context`]: Configuration[`context`]
    [`build.devtool`]: Configuration[`devtool`]
    [`build.entry`]: Record<string, EntryObject>
    [`build.experiments`]: Configuration[`experiments`]
    [`build.externals`]: Configuration[`externals`]
    [`build.infrastructureLogging`]: Configuration[`infrastructureLogging`]
    [`build.mode`]: Configuration[`mode`]
    [`build.module`]: Configuration[`module`]
    [`build.module.rules`]: Configuration[`module`][`rules`]
    [`build.module.rules.oneOf`]: Array<RuleSetRule>
    [`build.module.rules.before`]: Array<RuleSetRule>
    [`build.module.rules.after`]: Array<RuleSetRule>
    [`build.module.unsafeCache`]: Configuration[`module`][`unsafeCache`]
    [`build.name`]: Configuration[`name`]
    [`build.node`]: Configuration[`node`]
    [`build.optimization`]: Configuration[`optimization`]
    [`build.optimization.emitOnErrors`]: Configuration[`optimization`][`emitOnErrors`]
    [`build.optimization.minimize`]: Configuration[`optimization`][`minimize`]
    [`build.optimization.minimizer`]: Configuration[`optimization`][`minimizer`]
    [`build.optimization.moduleIds`]: Configuration[`optimization`][`moduleIds`]
    [`build.optimization.removeEmptyChunks`]: Configuration[`optimization`][`removeEmptyChunks`]
    [`build.optimization.runtimeChunk`]: Configuration[`optimization`][`runtimeChunk`]
    [`build.optimization.splitChunks`]: any
    [`build.output`]: Configuration[`output`]
    [`build.output.assetModuleFilename`]: Configuration[`output`][`assetModuleFilename`]
    [`build.output.chunkFilename`]: Configuration[`output`][`chunkFilename`]
    [`build.output.clean`]: Configuration[`output`][`clean`]
    [`build.output.filename`]: Configuration[`output`][`filename`]
    [`build.output.path`]: Configuration[`output`][`path`]
    [`build.output.pathinfo`]: Configuration[`output`][`pathinfo`]
    [`build.output.publicPath`]: string
    [`build.parallelism`]: Configuration[`parallelism`]
    [`build.performance`]: Configuration[`performance`]
    [`build.plugins`]: Array<PluginInstance>
    [`build.profile`]: Configuration[`profile`]
    [`build.recordsPath`]: Configuration[`recordsPath`]
    [`build.resolve.extensions`]: Configuration[`resolve`][`extensions`]
    [`build.stats`]: Configuration[`stats`]
    [`build.target`]: Configuration[`target`]
    [`build.watch`]: Configuration[`watch`]
    [`build.watchOptions`]: Configuration[`watchOptions`]
    [`extension`]: ValueOf<Plugins> | ValueOf<Modules>
    [`location.src`]: string
    [`location.dist`]: string
    [`location.project`]: string
    [`location.modules`]: string
    [`location.storage`]: string
    [`dev.ssl.enabled`]: boolean
    [`dev.ssl.cert`]: string
    [`dev.ssl.key`]: string
    [`dev.ssl.port`]: number
    [`dev.url`]: URL
    [`dev.watch.files`]: Set<string>
    [`dev.watch.options`]: WatchOptions
    [`dev.client.scripts`]: Set<(app: Framework) => string>
    [`middleware.enabled`]: Array<keyof Server.Middleware.Available>
    [`middleware.proxy.target`]: URL

    // here down is wack
    [key: Server.Middleware.OptionsKey]: any
    [
      key: `extension.${
        | (keyof Modules & string)
        | (keyof Plugins & string)}`
    ]: any
    [
      key: `extension.${
        | (keyof Modules & string)
        | (keyof Plugins & string)}.options`
    ]: Container<Record<string, any>>
  }

  export interface Events {
    [`event.app.close`]: (app: Framework) => Promise<any>
    [`event.build.before`]: (app: Framework) => Promise<any>
    [`event.build.after`]: (app: Framework) => Promise<any>
    [`event.compiler.before`]: (app: Framework) => Promise<any>
    [`event.compiler.after`]: (app: Framework) => Promise<any>
    [`event.compiler.done`]: (app: Framework) => Promise<any>
    [`event.compiler.error`]: (app: Framework) => Promise<any>
    [`event.dashboard.done`]: (app: Framework) => Promise<any>
    [`event.dashboard.q`]: (app: Framework) => Promise<any>
    [`event.project.write`]: (app: Framework) => Promise<any>
    [`event.server.listen`]: (app: Framework) => Promise<any>
    [`event.server.before`]: (app: Framework) => Promise<any>
    [`event.server.after`]: (app: Framework) => Promise<any>
    [`event.run`]: (app: Framework) => Promise<any>
  }
}
